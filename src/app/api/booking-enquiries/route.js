import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect.js";
import { BookingEnquiry } from "@/app/lib/models/index.js";

const clean = (value) => String(value || "").trim();
export async function POST(request) {
  try {
    const payload = await request.json();
    const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
    const firstName = clean(payload?.firstName);
    const lastName = clean(payload?.lastName);
    const phone = clean(payload?.phone);
    const email = clean(payload?.email);
    const checkIn = clean(payload?.checkIn);
    const checkOut = clean(payload?.checkOut);
    const message = clean(payload?.message);
    const stayType = clean(payload?.stayType).toLowerCase();
    const validDate = value => /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
    if (!["", "villa", "cottage"].includes(stayType) || !validDate(checkIn) || !validDate(checkOut) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !/^[+0-9() .-]+$/.test(phone) || phone.replace(/\D/g, "").length < 7 || phone.replace(/\D/g, "").length > 15) {
      return NextResponse.json({ success: false, message: "Please enter valid contact details and booking dates." }, { status: 400 });
    }

    if (!firstName || !lastName || !phone || !email || !checkIn || !checkOut) {
      return NextResponse.json(
        { success: false, message: "Please fill in all required fields." },
        { status: 400 },
      );
    }

    if (checkIn < today || checkOut < today) {
      return NextResponse.json(
        {
          success: false,
          message: "Check-in and check-out dates must be today or a future date.",
        },
        { status: 400 },
      );
    }

    if (checkOut <= checkIn) {
      return NextResponse.json(
        {
          success: false,
          message: "Check-out date must be after the check-in date.",
        },
        { status: 400 },
      );
    }

    await dbConnect();

    const enquiry = await BookingEnquiry.create({
      firstName,
      lastName,
      phone,
      email,
      checkIn,
      checkOut,
      message,
      stayType,
      source: "website",
      status: "new",
    });

    return NextResponse.json({
      success: true,
      message: "Booking enquiry submitted successfully.",
      enquiry: enquiry.toObject(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit booking enquiry.",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
