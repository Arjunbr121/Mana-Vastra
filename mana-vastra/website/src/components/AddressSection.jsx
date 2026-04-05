import { motion } from "framer-motion";

const ContactItem = ({
  href,
  icon,
  children,
  color = "#C9A84C",
  borderColor = "rgba(201,168,76,0.3)",
}) => (
  <motion.a
    whileHover={{ color: "#F0D080" }}
    href={href}
    target={href.startsWith("http") ? "_blank" : undefined}
    rel="noopener noreferrer"
    className="flex items-center gap-3 font-garamond text-sm no-underline transition-colors duration-200"
    style={{ color: "#D4C49A" }}
  >
    <div
      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm"
      style={{ border: `1px solid ${borderColor}`, color }}
    >
      {icon}
    </div>
    {children}
  </motion.a>
);

const WaIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const IgIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const FbIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

export default function AddressSection() {
  return (
    <div
      className="px-5 py-14"
      style={{
        background: "linear-gradient(160deg, #110E09 0%, #1A1510 100%)",
        borderTop: "1px solid rgba(201,168,76,0.15)",
        borderBottom: "1px solid rgba(201,168,76,0.15)",
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <span
          className="font-cormorant italic text-xs tracking-[0.3em] uppercase block mb-2.5"
          style={{ color: "#A08858" }}
        >
          Find Us
        </span>
        <h2
          className="font-cinzel mb-4"
          style={{
            fontSize: "clamp(18px, 5vw, 28px)",
            color: "#F0D080",
            letterSpacing: "0.08em",
          }}
        >
          Visit Our Store
        </h2>
        <div className="flex items-center justify-center gap-2.5">
          <div
            className="w-20 h-px"
            style={{
              background: "linear-gradient(90deg, transparent, #8B6914)",
            }}
          />
          <span style={{ color: "#C9A84C", fontSize: 10 }}>✦</span>
          <div
            className="w-20 h-px"
            style={{
              background: "linear-gradient(90deg, #8B6914, transparent)",
            }}
          />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Address + contacts */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-4"
        >
          <div
            className="font-cinzel text-[10px] tracking-[0.3em] uppercase"
            style={{ color: "#8B6914" }}
          >
            📍 Our Address
          </div>
          <div
            className="font-cormorant text-base leading-loose"
            style={{ color: "#D4C49A" }}
          >
            Mana Vastra
            <br />
            5th Cross, TUDA Layout
            <br />
            80 Feet Road, Sira Gate
            <br />
            Tumkur – 572106
          </div>

          <motion.a
            whileHover={{
              borderColor: "#C9A84C",
              background: "rgba(201,168,76,0.06)",
            }}
            href="https://maps.google.com/?q=Sira+Gate+80+Feet+Road+Tumkur+Karnataka"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-cormorant font-semibold text-sm tracking-wider px-5 py-2.5 rounded-sm transition-all duration-200 w-fit"
            style={{
              color: "#C9A84C",
              border: "1px solid rgba(201,168,76,0.3)",
            }}
          >
            📍 View on Google Maps
          </motion.a>

          <div
            className="font-cinzel text-[10px] tracking-[0.3em] uppercase mt-2"
            style={{ color: "#8B6914" }}
          >
            📞 Contact Us
          </div>

          <div className="flex flex-col gap-3">
            <ContactItem
              href="https://wa.me/917892106868"
              icon={<WaIcon />}
              color="#25D366"
              borderColor="rgba(37,211,102,0.3)"
            >
              7892106868 (WhatsApp Only)
            </ContactItem>
            <ContactItem
              href="mailto:manavastraofficial@gmail.com"
              icon="✉"
              color="#C9A84C"
            >
              manavastraofficial@gmail.com
            </ContactItem>
            <ContactItem
              href="https://www.instagram.com/manavastra_7892106868?igsh=N2c5OXh6djl2eG1n"
              icon={<IgIcon />}
              color="#E1306C"
              borderColor="rgba(225,48,108,0.3)"
            >
              @manavastra_7892106868
            </ContactItem>
            <ContactItem
              href="https://www.facebook.com/share/173A7q4yJt/?mibextid=wwXIfr"
              icon={<FbIcon />}
              color="#1877F2"
              borderColor="rgba(24,119,242,0.3)"
            >
              Mana Vastra
            </ContactItem>
          </div>
        </motion.div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-3"
        >
          <div
            className="font-cinzel text-[10px] tracking-[0.3em] uppercase"
            style={{ color: "#8B6914" }}
          >
            🗺 Location
          </div>
          <div
            className="w-full overflow-hidden rounded-sm"
            style={{
              aspectRatio: "16/9",
              border: "1px solid rgba(201,168,76,0.2)",
            }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3879.5!2d77.1025!3d13.3400!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDIwJzI0LjAiTiA3N8KwMDYnMDkuMCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mana Vastra Location"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
