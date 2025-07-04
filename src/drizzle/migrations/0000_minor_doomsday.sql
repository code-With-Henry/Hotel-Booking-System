CREATE TYPE "public"."booking_status" AS ENUM('Pending', 'Confirmed', 'Cancelled');--> statement-breakpoint
CREATE TYPE "public"."payment_status" AS ENUM('Pending', 'Completed', 'Failed');--> statement-breakpoint
CREATE TYPE "public"."userType" AS ENUM('member', 'admin');--> statement-breakpoint
CREATE TYPE "public"."ticket_status" AS ENUM('Open', 'Resolved');--> statement-breakpoint
CREATE TABLE "bookings" (
	"booking_id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"room_id" integer NOT NULL,
	"check_in_date" date,
	"check_out_date" date,
	"total_amount" numeric,
	"booking_status" "booking_status" DEFAULT 'Pending',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "hotels" (
	"hotel_id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"location" varchar,
	"address" varchar,
	"contact_phone" varchar,
	"category" varchar,
	"rating" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "payments" (
	"payment_id" serial PRIMARY KEY NOT NULL,
	"booking_id" integer NOT NULL,
	"amount" numeric,
	"payment_status" "payment_status" DEFAULT 'Pending',
	"payment_date" timestamp DEFAULT now(),
	"payment_method" varchar,
	"transaction_id" varchar,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "rooms" (
	"room_id" serial PRIMARY KEY NOT NULL,
	"hotel_id" integer NOT NULL,
	"room_type" varchar,
	"price_per_night" numeric,
	"capacity" integer,
	"amenities" varchar,
	"is_available" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "support_tickets" (
	"ticket_id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"subject" varchar,
	"description" varchar,
	"ticket_status" "ticket_status" DEFAULT 'Open',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"user_id" serial PRIMARY KEY NOT NULL,
	"firstname" varchar,
	"lastname" varchar,
	"email" varchar NOT NULL,
	"password" varchar NOT NULL,
	"contact_phone" varchar,
	"address" varchar,
	"userType" "userType" DEFAULT 'member',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_room_id_rooms_room_id_fk" FOREIGN KEY ("room_id") REFERENCES "public"."rooms"("room_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_booking_id_bookings_booking_id_fk" FOREIGN KEY ("booking_id") REFERENCES "public"."bookings"("booking_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_hotel_id_hotels_hotel_id_fk" FOREIGN KEY ("hotel_id") REFERENCES "public"."hotels"("hotel_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "support_tickets" ADD CONSTRAINT "support_tickets_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;