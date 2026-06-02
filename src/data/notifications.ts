import type { Notification } from "@/types";

export const notifications: Notification[] = [
  { id: "n001", type: "content_submitted", title: "Content Submitted", message: "Omar Al Rashidi submitted a new Reel for ProGear Protein Series. Ready for review.", read: false, createdAt: "2025-05-28T09:15:00Z", relatedId: "con009" },
  { id: "n002", type: "content_submitted", title: "Content Submitted", message: "Maitha Al Fitness submitted content for ProGear Protein Series campaign.", read: false, createdAt: "2025-05-28T10:00:00Z", relatedId: "con010" },
  { id: "n003", type: "follow_up_due", title: "Follow-Up Due", message: "Follow-up with Reem Al Shamsi for Nahdi Wellness Month is overdue by 2 days.", read: false, createdAt: "2025-05-27T08:00:00Z", relatedId: "out006" },
  { id: "n004", type: "creator_applied", title: "New Campaign Application", message: "Dana Al Habsi applied to the Gleam Night Recovery Launch campaign.", read: false, createdAt: "2025-05-27T14:30:00Z", relatedId: "camp010" },
  { id: "n005", type: "revision_requested", title: "Revision Requested", message: "Revision sent to Abdullah Al Hamdan for AutoEdge Detailing campaign content.", read: false, createdAt: "2025-05-26T11:00:00Z", relatedId: "con018" },
  { id: "n006", type: "payment_pending", title: "Payment Due Soon", message: "Payment of AED 50,600 is due to 4 creators for AutoEdge campaign by May 15.", read: true, createdAt: "2025-05-25T09:00:00Z" },
  { id: "n007", type: "content_approved", title: "Content Approved", message: "All 3 submissions from Noor Al Suwaidi for Sands Ramadan Edit have been approved.", read: true, createdAt: "2025-05-24T16:00:00Z", relatedId: "con006" },
  { id: "n008", type: "campaign_live", title: "Campaign Now Live", message: "ProGear Back to Gym campaign is now live. 3 creators are posting this week.", read: true, createdAt: "2025-04-20T08:00:00Z", relatedId: "camp009" },
  { id: "n009", type: "payment_completed", title: "Payment Completed", message: "Payment of AED 17,000 to Noor Al Suwaidi for Sands Ramadan Edit has been processed.", read: true, createdAt: "2025-04-11T10:00:00Z", relatedId: "pay004" },
  { id: "n010", type: "creator_signup", title: "New Creator Registered", message: "Wafa Al Khalidi (Kuwait) completed her creator profile and is pending approval.", read: true, createdAt: "2025-05-20T09:30:00Z", relatedId: "c025" },
  { id: "n011", type: "performance_updated", title: "Performance Report Ready", message: "Gleam Radiance Launch final performance report is ready for client sharing.", read: true, createdAt: "2025-02-20T14:00:00Z", relatedId: "camp001" },
  { id: "n012", type: "follow_up_due", title: "Follow-Up Reminder", message: "Latifa Al Mansoori has not responded to Gleam Night Recovery pitch. Send follow-up today.", read: false, createdAt: "2025-05-28T08:30:00Z", relatedId: "out003" },
  { id: "n013", type: "content_submitted", title: "YouTube Review Submitted", message: "Khalid Al Harbi submitted a 15-minute YouTube review for AutoEdge Detailing Campaign.", read: false, createdAt: "2025-04-12T15:00:00Z", relatedId: "con011" },
  { id: "n014", type: "creator_applied", title: "Creator Interested", message: "Khadija Al Zahrani expressed interest in Qasr Al Helou Eid Collection campaign.", read: false, createdAt: "2025-05-28T11:00:00Z", relatedId: "out028" },
  { id: "n015", type: "payment_pending", title: "Invoice Approval Needed", message: "Tariq Al Fadl invoice for Gulf Influence Tech Month is pending your approval.", read: false, createdAt: "2025-05-28T12:00:00Z", relatedId: "pay020" },
];
