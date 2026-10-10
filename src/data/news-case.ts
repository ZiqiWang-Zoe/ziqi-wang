export const topics = [
  {
    "id": "delivery",
    "label": "01 Delivery",
    "skill": "Outlook integration · Bounded polling",
    "title": "Confirming an Outlook send",
    "problem": "Outlook can return from Send() while the message is still in the Outbox. I encountered a run that reported success even though the briefing had not been transmitted.",
    "decision": "I added a loop that checks Outlook directly. It requests one send/receive operation when necessary, then looks for the matching message in Sent Items. The check stops after three minutes if transmission cannot be confirmed.",
    "notes": [
      {
        "title": "Check the message state",
        "body": "The helpers inspect both the Outbox and Sent Items. Success requires a matching sent message; an empty Outbox is insufficient.",
        "segment": 1,
        "line": 97
      },
      {
        "title": "Limit the recovery period",
        "body": "The loop uses time.monotonic() to measure elapsed time. It checks every three seconds within a three-minute limit. Only one send/receive request is issued.",
        "segment": 1,
        "line": 95
      }
    ]
  },
  {
    "id": "verification",
    "label": "02 Verification",
    "skill": "State modeling · Duplicate-send checks",
    "title": "Separating verification from generated text",
    "problem": "The earlier launcher looked for success phrases in the AI-generated summary. A change in wording caused it to classify a successful send as unknown, triggering an unnecessary alert.",
    "decision": "I moved verification into a separate Python module. It derives the subject from the report before querying Outlook. The result is sent, failed or unknown, accompanied by a reason. A dated local record provides fallback evidence for later runs.",
    "notes": [
      {
        "title": "Represent uncertain outcomes",
        "body": "True, False and None represent distinct states. If Outlook is unavailable, the verifier checks the sender’s local record. It returns unknown when neither source can establish the result.",
        "segment": 0,
        "line": 149
      },
      {
        "title": "Check previous sends",
        "body": "already_sent() accepts a local marker or a positive Outlook check. An unavailable check alone cannot establish that the briefing has been sent.",
        "segment": 1,
        "line": 95
      }
    ]
  },
  {
    "id": "testing",
    "label": "03 Test scope",
    "skill": "Process environment · Input validation",
    "title": "Restricting recipients during test runs",
    "problem": "The workflow invokes the sender through a child process. A recipient restriction supplied only as a command-line flag could be lost if the generated command omitted it.",
    "decision": "I passed the test recipient list through the child process environment. The sender reads that setting when no explicit CLI list is present. It validates every test address against active subscribers and suppresses the daily completion marker for restricted tests.",
    "notes": [
      {
        "title": "Pass the recipient restriction",
        "body": "The launcher sets IC_NEWS_ONLY_RECIPIENTS in the subprocess environment. only_recipients() reads it when the command supplies no explicit recipient list.",
        "segment": 0,
        "line": 144
      },
      {
        "title": "Validate test addresses",
        "body": "An unknown test address causes the sender to fail explicitly. A successful restricted test does not write the daily push marker.",
        "segment": 2,
        "line": 177
      }
    ]
  },
  {
    "id": "collection",
    "label": "04 Collection",
    "skill": "HTTP handling · Date normalization",
    "title": "Handling source errors",
    "problem": "The collector reads RSS feeds alongside site-specific HTML. Publications use different date formats. They can also limit request frequency or deny access to a page.",
    "decision": "I built shared request handling with a delay between calls. HTTP 429 responses trigger bounded retries; HTTP 403 ends the fetch. The result includes a reason when collection fails. Publication dates are converted to UTC before the time-window check, with unparseable dates excluded.",
    "notes": [
      {
        "title": "Respect rate limits",
        "body": "For HTTP 429, the handler uses a numeric Retry-After value when available. Otherwise it applies exponential backoff, capped by MAX_BACKOFF. HTTP 403 is not retried.",
        "segment": 1,
        "line": 153
      },
      {
        "title": "Normalize publication dates",
        "body": "The parser handles RFC 2822, ISO variants and human-readable dates. It converts valid values to timezone-aware dates before filtering. Undated items are excluded.",
        "segment": 2,
        "line": 208
      }
    ]
  },
  {
    "id": "fulltext",
    "label": "05 Full text",
    "skill": "HTML parsing · Fallback states",
    "title": "Extracting usable article text",
    "problem": "A successful page request may return only a short preview. The workflow needed to distinguish a full article from a feed snippet before generating a summary.",
    "decision": "I added an extraction pass after story selection. It removes non-article content before collecting substantial paragraphs. Each result receives an OK, TRUNCATED or BLOCKED status. When full text is unavailable, the workflow retains the existing snippet as its source material.",
    "notes": [
      {
        "title": "Identify article content",
        "body": "BeautifulSoup removes navigation and other page elements. The helper filters short or boilerplate paragraphs, then selects the container with the most extracted text.",
        "segment": 0,
        "line": 56
      },
      {
        "title": "Record extraction limits",
        "body": "The return status distinguishes a failed request from a short preview. Extracted text is capped at max_chars. URL deduplication retains the original selection order.",
        "segment": 0,
        "line": 84
      }
    ]
  },
  {
    "id": "media",
    "label": "06 Email media",
    "skill": "Image processing · Outlook MAPI",
    "title": "Preparing images for Outlook",
    "problem": "A layout that worked in a browser could still display stretched or missing images in Outlook. I needed consistent thumbnails without relying on unsupported CSS behavior.",
    "decision": "I processed the images in Python before rendering the email. Each thumbnail uses a centered crop at a consistent aspect ratio. The higher-resolution result is cached until its source changes. The sender then assigns a Content-ID to each inline image attachment.",
    "notes": [
      {
        "title": "Crop without distortion",
        "body": "The larger of the width and height scale factors fills the target rectangle. A centered crop produces the required dimensions without stretching the source image.",
        "segment": 0,
        "line": 118
      },
      {
        "title": "Reference inline attachments",
        "body": "The MAPI Content-ID matches the cid: reference in the HTML. The sender handles each attachment separately so one missing image does not stop the batch.",
        "segment": 1,
        "line": 75
      }
    ]
  },
  {
    "id": "subscriptions",
    "label": "07 Subscriptions",
    "skill": "Request parsing · Identity checks · File persistence",
    "title": "Processing subscription requests",
    "problem": "The original subscription link depended on a private-network endpoint that readers could not reliably access. Some readers also sent free-form requests instead of the expected subject tag.",
    "decision": "I replaced the link with mailto requests processed through Outlook. Exact tags update the subscriber list; ambiguous requests can enter an administrator review path. The processor resolves Exchange sender addresses before checking approval authority. Subscriber data is saved through a temporary file followed by replacement.",
    "notes": [
      {
        "title": "Resolve overlapping tags",
        "body": "UNSUBSCRIBE_IC_NEWS contains SUBSCRIBE_IC_NEWS. The parser checks unsubscribe first so a request to leave cannot be interpreted as a request to join.",
        "segment": 1,
        "line": 118
      },
      {
        "title": "Verify approvals before saving",
        "body": "The approval branch compares the resolved sender with the configured administrator. Saves use os.replace to prevent readers from seeing partially written JSON.",
        "segment": 2,
        "line": 212
      }
    ]
  },
  {
    "id": "orchestration",
    "label": "08 Orchestration",
    "skill": "Scheduling · Failure isolation · Status reporting",
    "title": "Controlling an unattended run",
    "problem": "A scheduled run may start after a missed trigger or encounter output from an earlier attempt. It also needs a way to report failure when Outlook itself is unavailable.",
    "decision": "I moved directory creation into the launcher. Catch-up runs check the time and previous send state before starting. After execution, the launcher evaluates the process result alongside verification status and failure signals in the log. A local alert runs before status email; cleanup runs last.",
    "notes": [
      {
        "title": "Prepare the run",
        "body": "The launcher creates dated output folders before generation begins. It also checks for a previous send and respects the delivery hour unless explicitly forced.",
        "segment": 1,
        "line": 109
      },
      {
        "title": "Report failure independently",
        "body": "Local notification runs before the status email. An Outlook failure can therefore be reported without relying on Outlook. Cleanup is isolated from the main operation.",
        "segment": 2,
        "line": 185
      }
    ]
  }
];

export const iterations = [
  {
    "date": "JUL 2026",
    "title": "Replacing inaccessible subscription links",
    "symptom": "Readers could not reliably reach the private-network endpoint. Some sent subscription requests in their own words.",
    "change": "I introduced tagged mailto requests with a review path for ambiguous messages. Approval requests are checked against the administrator’s identity.",
    "lesson": "The revised flow uses the email client already available to readers.",
    "target": "subscriptions"
  },
  {
    "date": "AUG 03",
    "title": "Detecting messages left in the Outbox",
    "symptom": "The sender returned without an error while the briefing remained queued in Outlook.",
    "change": "I added bounded polling after a send request. Success now requires a matching Sent Items record; the loop can request one send/receive operation.",
    "lesson": "The additional check verifies the application state after the API call returns.",
    "target": "delivery"
  },
  {
    "date": "AUG 04",
    "title": "Removing a false failure alert",
    "symptom": "A change in the AI-generated summary no longer matched the launcher’s success keywords.",
    "change": "I moved the decision into verify_sent.py. It returns a status derived from the report subject and Outlook state.",
    "lesson": "Generated prose no longer determines whether a send is classified as successful.",
    "target": "verification"
  },
  {
    "date": "AUG 17",
    "title": "Preparing output folders automatically",
    "symptom": "Directory setup depended on an interactive step. An unattended run could stall before producing its report.",
    "change": "I added ensure_run_dir() to create the dated output folders before generation starts.",
    "lesson": "Required setup is completed by the launcher before the AI workflow begins.",
    "target": "orchestration"
  }
];
