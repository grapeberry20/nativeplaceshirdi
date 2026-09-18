"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarDays, X } from "lucide-react";

const dateToday = () => new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
const nextDate = (value) => { const date = new Date(value + "T00:00:00Z"); date.setUTCDate(date.getUTCDate() + 1); return date.toISOString().slice(0, 10); };
const inputClass = "w-full min-w-0 rounded-[22px] border border-[#d6ddd7] bg-white px-5 py-4 text-[#26382c] outline-none focus:border-[#204f30] focus:ring-2 focus:ring-[#204f30]/15";

function BookingModal({ stayType, stayTitle, onClose }) {
  const dialog = useRef(null);
  const submitting = useRef(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ firstName: "", lastName: "", phone: "", email: "", checkIn: "", checkOut: "", message: "" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const today = dateToday();
  useEffect(() => {
    const element = dialog.current;
    element.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { element.close(); document.body.style.overflow = previousOverflow; };
  }, []);
  const update = (name, value) => {
    setForm(current => ({ ...current, [name]: value, ...(name === "checkIn" && current.checkOut <= value ? { checkOut: "" } : {}) }));
    setError("");
  };
  const submit = async event => {
    event.preventDefault();
    if (submitting.current) return;
    if (!form.checkIn || !form.checkOut || form.checkIn < dateToday() || form.checkOut <= form.checkIn) { setError("Choose a check-in date from today onwards and a later check-out date."); return; }
    if (step === 1) { setError(""); setStep(2); return; }
    submitting.current = true;
    setBusy(true); setError("");
    try {
      const response = await fetch("/api/booking-enquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, stayType }) });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message || "Unable to submit your enquiry. Please try again.");
      setStep(3);
    } catch (err) { setError(err.message || "Unable to submit your enquiry. Please try again."); }
    finally { submitting.current = false; setBusy(false); }
  };
  const dates = <>
    <label className="grid gap-2"><span>Check-in Date</span><input aria-label="Check-in Date" type="date" required min={today} value={form.checkIn} onChange={event => update("checkIn", event.target.value)} className={inputClass} /></label>
    <label className="grid gap-2"><span>Check-out Date</span><input aria-label="Check-out Date" type="date" required min={form.checkIn ? nextDate(form.checkIn) : nextDate(today)} value={form.checkOut} onChange={event => update("checkOut", event.target.value)} className={inputClass} /></label>
  </>;
  return (
    <dialog ref={dialog} aria-labelledby="stay-booking-title" onCancel={event => { event.preventDefault(); if (!busy) onClose(); }} className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-[780px] overflow-y-auto rounded-[28px] border border-[#eadfca] bg-[#fffdf8] p-6 text-[#3c4a40] shadow-2xl backdrop:bg-black/50 sm:p-10" data-lenis-prevent>
      <div className="mb-7 flex items-start justify-between gap-4"><div><p className="mb-2 text-xs uppercase tracking-[0.2em] text-[#718167]">{stayTitle}</p><h2 id="stay-booking-title" className="font-heading text-3xl text-[#204f30]">{step === 1 ? "Choose Your Dates" : step === 2 ? "Your Details" : "Thank You"}</h2>{step < 3 && <p className="mt-2 text-sm text-[#7d877e]">Step {step} of 2</p>}</div><button type="button" onClick={onClose} disabled={busy} aria-label="Close booking" className="rounded-full p-2 hover:bg-[#eee9dc] disabled:opacity-50"><X className="h-5 w-5" /></button></div>
      {step === 3 ? <div role="status"><p className="leading-7">Your booking enquiry has been submitted. Our team will contact you to confirm availability and your stay details.</p><button onClick={onClose} type="button" className="mt-6 rounded-full bg-[#204f30] px-7 py-3 text-white">Done</button></div> : (
        <form onSubmit={submit} key={step}>
          <fieldset disabled={busy} className="space-y-6 disabled:opacity-60">
            <div className="grid gap-6 sm:grid-cols-2">
              {step === 2 && <>
                <label className="grid gap-2"><span>First Name</span><input autoFocus required autoComplete="given-name" maxLength={100} placeholder="Enter first name" value={form.firstName} onChange={e => update("firstName", e.target.value)} className={inputClass} /></label>
                <label className="grid gap-2"><span>Last Name</span><input required autoComplete="family-name" maxLength={100} placeholder="Enter last name" value={form.lastName} onChange={e => update("lastName", e.target.value)} className={inputClass} /></label>
                <label className="grid gap-2"><span>Phone</span><input required type="tel" autoComplete="tel" maxLength={25} pattern="[+0-9() .-]{7,25}" placeholder="Enter phone number" value={form.phone} onChange={e => update("phone", e.target.value)} className={inputClass} /></label>
                <label className="grid gap-2"><span>Email</span><input required type="email" autoComplete="email" maxLength={254} placeholder="Enter email address" value={form.email} onChange={e => update("email", e.target.value)} className={inputClass} /></label>
              </>}
              {dates}
            </div>
            {step === 2 && <label className="grid gap-2"><span>Message <span className="text-[#909990]">(Optional)</span></span><textarea rows={4} maxLength={5000} placeholder="Your message or any special request..." value={form.message} onChange={e => update("message", e.target.value)} className={inputClass} /></label>}
            {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
            <div className="flex flex-wrap justify-end gap-3">{step === 2 && <button type="button" onClick={() => { setError(""); setStep(1); }} className="rounded-full border border-[#d6ddd7] px-6 py-4">Back</button>}<button type="submit" className="rounded-full bg-[#204f30] px-7 py-4 font-semibold text-white hover:bg-[#2d6138]">{busy ? "Submitting..." : step === 1 ? "Book Now" : "Submit Booking Enquiry"}</button></div>
          </fieldset>
        </form>
      )}
    </dialog>
  );
}

export default function StayBookingButton({ stayType, stayTitle, children, className }) {
  const [open, setOpen] = useState(false);
  return <><button type="button" onClick={() => setOpen(true)} aria-haspopup="dialog" className={className}>{children}<CalendarDays className="h-4 w-4" /></button>{open && <BookingModal stayType={stayType} stayTitle={stayTitle} onClose={() => setOpen(false)} />}</>;
}
