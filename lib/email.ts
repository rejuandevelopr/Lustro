// Email trigger stub. In production this is a server action calling Resend
// with a React email template. Booking confirmation + day-before reminder.
export type BookingEmail = {
  to: string;
  customer: string;
  service: string;
  when: string;
  shop: string;
};
export async function sendBookingConfirmation(payload: BookingEmail) {
  // await resend.emails.send({ from, to: payload.to, subject, react: <Confirmation .../> })
  console.log("[email] booking confirmation queued", payload);
  return { queued: true };
}
