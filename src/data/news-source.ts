// Selected excerpts from the original project. Retain source text and line numbers.
export default {
  "delivery": [
    {
      "file": "send_daily_to_subscribers.py",
      "start": 57,
      "end": 57,
      "code": "def confirm_sent(outlook, subject: str, timeout: int = SEND_CONFIRM_TIMEOUT) -> bool:"
    },
    {
      "file": "send_daily_to_subscribers.py",
      "start": 69,
      "end": 108,
      "code": "\n    def still_queued() -> bool:\n        for item in outbox.Items:\n            try:\n                if item.Subject == subject and not item.Sent:\n                    return True\n            except Exception:\n                continue\n        return False\n\n    def in_sent_items() -> bool:\n        items = sent.Items\n        items.Sort(\"[CreationTime]\", True)\n        checked = 0\n        for item in items:\n            try:\n                if item.Subject == subject and item.Sent:\n                    return True\n            except Exception:\n                continue\n            checked += 1\n            if checked >= 25:      # only the newest handful can be this run's\n                break\n        return False\n\n    nudged = False\n    deadline = time.monotonic() + timeout\n    while time.monotonic() < deadline:\n        if not still_queued():\n            return in_sent_items()\n        if not nudged:\n            print(\"  ...still in the Outbox; forcing a send/receive\")\n            try:\n                ns.SendAndReceive(False)\n            except Exception as exc:\n                print(f\"  [warn] send/receive failed: {exc}\")\n            nudged = True\n        time.sleep(3)\n\n    return False"
    }
  ],
  "verification": [
    {
      "file": "verify_sent.py",
      "start": 133,
      "end": 167,
      "code": "def confirm(day: datetime.date | None = None) -> tuple[str, str]:\n    \"\"\"Return (status, detail) where status is 'sent', 'failed' or 'unknown'.\n\n    'unknown' is reserved for genuinely undecidable cases — Outlook unreachable —\n    so it stops being the catch-all it was when the log was parsed for prose.\n    \"\"\"\n    day = day or datetime.date.today()\n    if not report_html(day):\n        return \"failed\", (f\"No digest was built for {day:%Y-%m-%d} \"\n                          f\"(report/{day:%m-%d-%Y}/ has no ranked.html).\")\n\n    subject = expected_subject(day)\n    if not subject:\n        return \"unknown\", (\"The digest HTML exists but its subject could not be \"\n                           \"parsed, so delivery could not be verified.\")\n\n    found = in_sent_items(subject, day)\n    if found is True:\n        return \"sent\", f\"'{subject}' confirmed in Outlook Sent Items.\"\n    if found is False:\n        return \"failed\", (f\"'{subject}' was built but is NOT in Outlook Sent \"\n                          f\"Items — check the Outbox; subscribers likely got \"\n                          f\"nothing.\")\n\n    # Outlook unreachable: the sender's own marker is weaker evidence (it records\n    # that Send() was confirmed earlier, not that the message is there now), but\n    # it beats reporting a delivered digest as undecidable.\n    marker = read_marker(day)\n    if marker:\n        return \"sent\", (f\"'{subject}' recorded as sent to \"\n                        f\"{marker.get('recipients', '?')} recipients at \"\n                        f\"{marker.get('when', '?')} (Outlook unreachable, so this \"\n                        f\"is the sender's own record rather than Sent Items).\")\n    return \"unknown\", (f\"'{subject}' was built, but Outlook could not be reached \"\n                       f\"to confirm delivery. Check Sent Items manually.\")"
    },
    {
      "file": "verify_sent.py",
      "start": 88,
      "end": 98,
      "code": "def already_sent(day: datetime.date | None = None) -> bool:\n    \"\"\"Cheap, Outlook-free 'did today's push already go out?' for catch-up runs.\n\n    Only ever answers True on positive evidence, so a false negative costs a\n    duplicate build (annoying) while a false positive would cost the whole\n    digest (silent miss) — the asymmetry decides which way this leans.\n    \"\"\"\n    if read_marker(day):\n        return True\n    subject = expected_subject(day)\n    return bool(subject) and in_sent_items(subject, day) is True"
    }
  ],
  "testing": [
    {
      "file": "run_daily_digest.py",
      "start": 144,
      "end": 146,
      "code": "    env = os.environ.copy()\n    if test_to:\n        env[\"IC_NEWS_ONLY_RECIPIENTS\"] = test_to"
    },
    {
      "file": "send_daily_to_subscribers.py",
      "start": 51,
      "end": 54,
      "code": "def only_recipients(cli_value: str = \"\") -> list:\n    \"\"\"Addresses this send is clamped to (lowercased); empty means no clamp.\"\"\"\n    raw = cli_value or os.environ.get(ONLY_ENV, \"\")\n    return [e.strip().lower() for e in re.split(r\"[;,]\", raw) if e.strip()]"
    },
    {
      "file": "send_daily_to_subscribers.py",
      "start": 173,
      "end": 185,
      "code": "    only = only_recipients(args.only)\n    clamped = bool(only)\n    if clamped:\n        known = {e.lower(): e for e in emails}\n        unknown = [a for a in only if a not in known]\n        if unknown:\n            # Fail rather than silently dropping: a typo'd test address would\n            # otherwise look like a clean send that simply reached nobody.\n            print(f\"[FAIL] Not active subscribers: {', '.join(unknown)}\")\n            return 1\n        emails = [known[a] for a in only]\n        print(f\"*** CLAMPED SEND — {len(emails)} recipient(s); the other \"\n              f\"{len(recipients) - len(emails)} active subscribers are excluded. ***\")"
    },
    {
      "file": "send_daily_to_subscribers.py",
      "start": 229,
      "end": 237,
      "code": "        print(f\"[OK] Sent to {len(emails)} BCC recipients.\")\n        # Local proof-of-send, so a catch-up run can tell \"already sent today\" from\n        # \"not sent yet\" without needing Outlook to answer. See verify_sent.\n        # A clamped send reached a handful of testers, not the list, so recording\n        # it would make the next real run think the day was already delivered.\n        if clamped:\n            print(\"[clamped] Not writing .sent.json — this was not the daily push.\")\n        else:\n            verify_sent.write_marker(subject, len(emails))"
    }
  ],
  "collection": [
    {
      "file": "scrape_news.py",
      "start": 59,
      "end": 62,
      "code": "# Politeness / resilience knobs.\nREQUEST_DELAY = 1.5   # seconds to wait before every request (avoid hammering sources)\nMAX_RETRIES   = 2     # retries on 429 / transient network errors (403 is never retried)\nMAX_BACKOFF   = 60    # cap any single backoff sleep at this many seconds"
    },
    {
      "file": "scrape_news.py",
      "start": 153,
      "end": 169,
      "code": "        if resp.status_code == 429:\n            if attempt < MAX_RETRIES:\n                wait = min(_retry_after(resp) or 2 ** attempt * 5, MAX_BACKOFF)\n                print(f\"    429 from {url}; backing off {wait}s\", file=sys.stderr)\n                time.sleep(wait)\n                continue\n            return None, \"rate-limited (429) — try again later\"\n\n        if resp.status_code == 403:\n            return None, \"blocked (403) — not retrying to avoid escalation\"\n\n        if not resp.ok:\n            return None, f\"HTTP {resp.status_code}\"\n\n        return resp, None\n\n    return None, \"exhausted retries\""
    },
    {
      "file": "scrape_news.py",
      "start": 176,
      "end": 213,
      "code": "def _parse_date(raw: str) -> \"datetime | None\":\n    raw = raw.strip()\n    if not raw:\n        return None\n\n    # RFC 2822 (standard RSS pubDate)\n    try:\n        return parsedate_to_datetime(raw).astimezone(timezone.utc)\n    except Exception:\n        pass\n\n    # ISO 8601 variants (incl. fractional seconds, e.g. Reuters' \"...:40.147Z\")\n    for fmt in (\"%Y-%m-%dT%H:%M:%S.%f%z\", \"%Y-%m-%dT%H:%M:%S.%fZ\",\n                \"%Y-%m-%dT%H:%M:%S%z\", \"%Y-%m-%dT%H:%M:%SZ\", \"%Y-%m-%d\"):\n        try:\n            dt = datetime.strptime(raw, fmt)\n            if dt.tzinfo is None:\n                dt = dt.replace(tzinfo=timezone.utc)\n            return dt.astimezone(timezone.utc)\n        except ValueError:\n            pass\n\n    # Human-readable: \"June 1, 2026\" / \"Jun 1, 2026\" / \"1 June 2026\"\n    for fmt in (\"%B %d, %Y\", \"%b %d, %Y\", \"%d %B %Y\", \"%d %b %Y\"):\n        try:\n            return datetime.strptime(raw, fmt).replace(tzinfo=timezone.utc)\n        except ValueError:\n            pass\n\n    return None\n\n\ndef _in_window(dt: \"datetime | None\", cutoff: datetime) -> bool:\n    if dt is None:\n        return False\n    if dt.tzinfo is None:\n        dt = dt.replace(tzinfo=timezone.utc)\n    return dt >= cutoff"
    }
  ],
  "fulltext": [
    {
      "file": "fetch_fulltext.py",
      "start": 50,
      "end": 97,
      "code": "# Below this many characters we treat the page as a paywall preview, not an article.\nTRUNCATED_BELOW = 600\n# Cap stored text so one giant analyst post doesn't dominate the output file.\nDEFAULT_MAX_CHARS = 8000\n\n\ndef extract_text(html: str) -> str:\n    \"\"\"Heuristic main-body extraction: drop chrome, then take the container with\n    the most substantial <p> text. No third-party readability lib required.\"\"\"\n    soup = BeautifulSoup(html, \"html.parser\")\n    for tag in soup([\"script\", \"style\", \"nav\", \"header\", \"footer\", \"aside\",\n                     \"form\", \"figure\", \"noscript\", \"button\"]):\n        tag.decompose()\n\n    def collect(container) -> str:\n        parts = []\n        for p in container.find_all(\"p\", recursive=True):\n            txt = p.get_text(\" \", strip=True)\n            if len(txt) > 40 and not _BOILERPLATE.search(txt):\n                parts.append(txt)\n        return \"\\n\".join(parts)\n\n    best = \"\"\n    for container in soup.find_all([\"article\", \"main\", \"div\", \"section\"]):\n        txt = collect(container)\n        if len(txt) > len(best):\n            best = txt\n\n    if not best:                       # fall back to every <p> on the page\n        best = collect(soup)\n\n    return best.strip()\n\n\ndef fetch_one(url: str, max_chars: int) -> dict:\n    resp, reason = _fetch(url)\n    if resp is None:\n        return {\"url\": url, \"status\": \"BLOCKED\", \"chars\": 0,\n                \"text\": f\"(could not fetch — {reason}; fall back to snippet)\"}\n\n    text = extract_text(resp.text)\n    if len(text) < TRUNCATED_BELOW:\n        return {\"url\": url, \"status\": \"TRUNCATED\", \"chars\": len(text),\n                \"text\": (text or \"(no article body found)\") +\n                        \"\\n(only a preview was available — fall back to snippet)\"}\n\n    return {\"url\": url, \"status\": \"OK\", \"chars\": len(text),\n            \"text\": text[:max_chars]}"
    },
    {
      "file": "fetch_fulltext.py",
      "start": 115,
      "end": 121,
      "code": "    # de-dupe, preserve order\n    seen, ordered = set(), []\n    for u in urls:\n        if u not in seen:\n            seen.add(u)\n            ordered.append(u)\n    return ordered"
    }
  ],
  "media": [
    {
      "file": "render_format2.py",
      "start": 102,
      "end": 125,
      "code": "def crop_to_fill(src: Path, w: int = THUMB_W, h: int = THUMB_H,\n                  scale: int = THUMB_SCALE) -> Path:\n    \"\"\"Center-crop src to exactly (w*scale) x (h*scale) pixels (aspect-fill, like CSS\n    object-fit:cover) and cache the result next to it. Rendered at `scale`x the display\n    size so it stays sharp under Windows/Outlook display scaling — the <img> tag still\n    declares width=w height=h, so this larger bitmap gets downsampled for display, not\n    upscaled from a same-size original. Outlook desktop's Word rendering engine also\n    ignores CSS object-fit, so pre-cropping the actual file (rather than cropping via\n    CSS at display time) is the only way to get an undistorted thumbnail in every\n    client, including Outlook.\"\"\"\n    px_w, px_h = w * scale, h * scale\n    out = src.with_name(f\"{src.stem}_crop{px_w}x{px_h}.jpg\")\n    if out.exists() and out.stat().st_mtime >= src.stat().st_mtime:\n        return out\n    with Image.open(src) as im:\n        im = im.convert(\"RGB\")\n        fill_scale = max(px_w / im.width, px_h / im.height)\n        new_w = max(px_w, round(im.width * fill_scale))\n        new_h = max(px_h, round(im.height * fill_scale))\n        im = im.resize((new_w, new_h), Image.LANCZOS)\n        left, top = (new_w - px_w) // 2, (new_h - px_h) // 2\n        im = im.crop((left, top, left + px_w, top + px_h))\n        im.save(out, \"JPEG\", quality=88)\n    return out"
    },
    {
      "file": "send_via_outlook.py",
      "start": 64,
      "end": 85,
      "code": "def attach_inline_images_map(mail, cid_map: dict) -> int:\n    \"\"\"Same as attach_inline_images, but takes an in-memory {cid: path} map directly —\n    used by the per-subscriber daily sender, which builds one cid_map and reuses it\n    across many individual mail items instead of round-tripping through a sidecar file.\"\"\"\n    n = 0\n    for cid, path in cid_map.items():\n        p = Path(path)\n        if not p.exists():\n            print(f\"[warn] inline image missing, skipping: {p}\")\n            continue\n        try:\n            att = mail.Attachments.Add(str(p.resolve()))\n            pa = att.PropertyAccessor\n            pa.SetProperty(PR_ATTACH_CONTENT_ID, cid)\n            try:\n                pa.SetProperty(PR_ATTACHMENT_HIDDEN, True)\n            except Exception:\n                pass          # not fatal — image still renders, just also lists as a file\n            n += 1\n        except Exception as exc:\n            print(f\"[warn] could not attach inline image {p.name}: {exc}\")\n    return n"
    }
  ],
  "subscriptions": [
    {
      "file": "process_subscription_emails.py",
      "start": 95,
      "end": 105,
      "code": "def _sender_smtp(item) -> str:\n    \"\"\"Real SMTP address for the sender. Exchange-internal senders report an\n    X.500 directory name (e.g. \"/O=EXCHANGELABS/OU=.../CN=...\") via\n    SenderEmailAddress, not a usable email — GetExchangeUser().PrimarySmtpAddress\n    is needed for those. External/SMTP senders already have a plain address.\"\"\"\n    try:\n        if getattr(item, \"SenderEmailType\", \"\") == EXCHANGE_ADDRESS_TYPE:\n            return item.Sender.GetExchangeUser().PrimarySmtpAddress\n    except Exception:\n        pass\n    return item.SenderEmailAddress"
    },
    {
      "file": "process_subscription_emails.py",
      "start": 115,
      "end": 124,
      "code": "def _classify_tag(subject: str) -> str:\n    \"\"\"Exact-tag subscribe/unsubscribe classification (the mailto: link path).\"\"\"\n    s = (subject or \"\").upper()\n    if UNSUBSCRIBE_TAG in s:\n        # UNSUBSCRIBE_IC_NEWS contains \"SUBSCRIBE_IC_NEWS\" as a substring, so\n        # check this first — a subject with both tags is treated as unsubscribe.\n        return \"unsubscribe\"\n    if SUBSCRIBE_TAG in s:\n        return \"subscribe\"\n    return \"\""
    },
    {
      "file": "process_subscription_emails.py",
      "start": 209,
      "end": 224,
      "code": "            approve_target = _extract_admin_tag_email(subject, APPROVE_PREFIX)\n            reject_target = _extract_admin_tag_email(subject, REJECT_PREFIX)\n\n            if approve_target or reject_target:\n                if email != admin_email:\n                    print(f\"[warn] ignoring approve/reject from non-admin sender {email!r}: {subject!r}\")\n                    n_admin_ignored += 1\n                    continue\n                target = approve_target or reject_target\n                if dry_run:\n                    pending_entry = sc.load_pending().get(target, {})\n                else:\n                    pending_entry = sc.remove_pending(target)\n                if approve_target:\n                    if not dry_run:\n                        sc.set_subscribed(target, True, name=pending_entry.get(\"name\", \"\"))"
    },
    {
      "file": "subscribe_common.py",
      "start": 34,
      "end": 39,
      "code": "def save_subscribers(data: dict) -> None:\n    \"\"\"Atomic write (temp file + replace) so a crash or a concurrent reader never\n    sees a half-written/corrupted subscribers.json.\"\"\"\n    tmp = SUBSCRIBERS_PATH.with_suffix(\".json.tmp\")\n    tmp.write_text(json.dumps(data, indent=2), encoding=\"utf-8\")\n    os.replace(tmp, SUBSCRIBERS_PATH)"
    }
  ],
  "orchestration": [
    {
      "file": "run_daily_digest.py",
      "start": 56,
      "end": 59,
      "code": "    day = day or datetime.date.today()\n    run_dir = REPO / \"report\" / day.strftime(\"%m-%d-%Y\")\n    (run_dir / \"images\").mkdir(parents=True, exist_ok=True)\n    return run_dir"
    },
    {
      "file": "run_daily_digest.py",
      "start": 106,
      "end": 119,
      "code": "    # Catch-up runs (a missed 09:00, or the logon trigger) must not re-send a\n    # digest that already went out today. A test run is exempt: rehearsing the\n    # pipeline after the day's real push is exactly when we need it most.\n    try:\n        if not test_to and verify_sent.already_sent():\n            print(\"Today's digest has already been sent — nothing to do.\")\n            return 0\n    except Exception as exc:\n        print(f\"[warn] could not check whether today's digest already went: {exc}\")\n\n    if datetime.datetime.now().hour < DIGEST_HOUR and \"--force\" not in sys.argv:\n        print(f\"Before {DIGEST_HOUR:02d}:00 — leaving today's digest to the \"\n              f\"scheduled run. Use --force to send now anyway.\")\n        return 0"
    },
    {
      "file": "run_daily_digest.py",
      "start": 170,
      "end": 209,
      "code": "    if proc.returncode != 0:\n        status = \"failed\"\n        detail = f\"The digest run exited {proc.returncode}.\"\n    else:\n        try:\n            status, detail = verify_sent.confirm()\n        except Exception as exc:\n            status, detail = \"unknown\", f\"Delivery check itself failed: {exc}\"\n        # A crash inside the run still means a broken digest even if a stale\n        # same-subject message happens to be sitting in Sent Items.\n        if status == \"sent\" and (\"[fail]\" in lower or \"traceback\" in lower):\n            status = \"failed\"\n            detail = (\"The digest appears in Sent Items, but the run logged a \"\n                      \"failure or traceback — check the log before trusting it.\")\n\n    # Local alert first: it needs neither Outlook nor the network, so it still\n    # reaches you when the status email below is exactly what's broken.\n    if status == \"sent\":\n        notify_local.report(\"OK\", detail, n_active)\n    else:\n        notify_local.report(\n            f\"digest {status}\",\n            f\"The {stamp} run finished as '{status}'. {detail} {n_active} \"\n            f\"subscribers may have received nothing. Log tail:\\n{log_tail[-400:]}\",\n            n_active,\n        )\n\n    try:\n        send_status_email.notify_status(status, subscribers=n_active, note=detail,\n                                       log_tail=log_tail)\n    except Exception as exc:\n        print(f\"[warn] could not send status email: {exc}\")\n\n    # Keep report/ at roughly one month. Runs last so a prune problem can never\n    # cost us the digest itself.\n    try:\n        subprocess.run([sys.executable, str(REPO / \"prune_reports.py\")],\n                       cwd=str(REPO), timeout=600)\n    except Exception as exc:\n        print(f\"[warn] could not prune old reports: {exc}\")"
    }
  ]
}
;
