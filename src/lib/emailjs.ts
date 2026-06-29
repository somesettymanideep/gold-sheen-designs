import emailjs from "@emailjs/browser";

// EmailJS configuration (public key is safe to ship in the client).
export const EMAILJS = {
  publicKey: "EyJkkbQ_tZxgcGoSf",
  serviceId: "service_c1b7ytg",
  templateId: "template_27xu1lb",
} as const;

export type QuoteEmailParams = {
  type: "Quote Request" | "Contact Form";
  name: string;
  phone: string;
  products: string;
  message: string;
};

export async function sendEmail(params: QuoteEmailParams): Promise<void> {
  await emailjs.send(
    EMAILJS.serviceId,
    EMAILJS.templateId,
    {
      form_type: params.type,
      name: params.name,
      phone: params.phone,
      products: params.products,
      message: params.message,
    },
    { publicKey: EMAILJS.publicKey },
  );
}
