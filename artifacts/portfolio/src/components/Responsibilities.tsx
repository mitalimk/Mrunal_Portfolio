import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Zap, Palette, Users, MonitorSmartphone, Megaphone } from "lucide-react";
import mlscLogo from "@assets/MLSC_1777729096956.png";
import { E } from "./EditableText";

const roles = [
  {
    id: "mlsc",
    org: "Microsoft Learn Student Club",
    orgShort: "MLSC – MITA",
    role: "Design Team Member",
    period: "2023 – 2024",
    color: "from-blue-600/15 to-blue-500/5",
    borderColor: "border-blue-500/40",
    accentColor: "#3b82f6",
    glowColor: "rgba(59,130,246,0.2)",
    logo: mlscLogo,
    responsibilities: [
      "Designed visual assets, banners, and promotional material for club events",
      "Created social media graphics and posts to promote MLSC activities",
      "Collaborated with the team to maintain consistent branding across all platforms",
      "Contributed to UI/UX design for club initiatives and internal tools",
    ],
    tags: ["Figma", "Canva", "UI Design", "Branding"],
    tagIcon: Palette,
  },
  {
    id: "technophilia",
    org: "Technophilia",
    orgShort: "Technophilia – MITA",
    role: "Coordinator",
    period: "2023 – 2024",
    color: "from-pink-600/15 to-primary/5",
    borderColor: "border-primary/40",
    accentColor: "rgba(233,99,166,1)",
    glowColor: "rgba(233,99,166,0.2)",
    logo: null,
    responsibilities: [
      "Coordinated and organized technical events, workshops, and hackathons for the college",
      "Managed logistics, scheduling, and communication between participants and organizers",
      "Led a team of volunteers to ensure smooth event execution and participant experience",
      "Promoted events through on-campus outreach and social media campaigns",
    ],
    tags: ["Event Management", "Leadership", "Team Coordination", "Outreach"],
    tagIcon: Megaphone,
  },
];

function RoleCard({ role, index }: { role: (typeof roles)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-60px" });
  const TagIcon = role.tagIcon;

  return (
    <motion.div
      ref={ref}
      className={`relative bg-gradient-to-br ${role.color} bg-card border ${role.borderColor} rounded-2xl overflow-hidden flex flex-col`}
      initial={{ opacity: 0, y: 50, rotateX: 8 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 50, rotateX: 8 }}
      transition={{ duration: 0.65, delay: index * 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
      whileHover={{ y: -6 }}
      style={{ perspective: "800px", boxShadow: isInView ? `0 0 40px ${role.glowColor}` : "none" }}
    >
      {/* Top accent strip */}
      <div
        className="h-1.5 w-full"
        style={{ background: `linear-gradient(90deg, transparent, ${role.accentColor}, transparent)` }}
      />

      {/* Card header */}
      <div className="px-6 pt-5 pb-4 border-b border-white/5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {role.logo ? (
            <motion.div
              className="w-14 h-14 rounded-xl overflow-hidden flex items-center justify-center bg-white/5 border border-white/10 flex-shrink-0"
              initial={{ scale: 0, rotate: -20 }}
              animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -20 }}
              transition={{ delay: index * 0.15 + 0.2, type: "spring", stiffness: 200 }}
            >
              <img src={role.logo} alt={role.org} className="w-12 h-12 object-contain" />
            </motion.div>
          ) : (
            <motion.div
              className="w-14 h-14 rounded-xl flex items-center justify-center border border-primary/30 flex-shrink-0"
              style={{ background: "rgba(233,99,166,0.12)" }}
              initial={{ scale: 0, rotate: -20 }}
              animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -20 }}
              transition={{ delay: index * 0.15 + 0.2, type: "spring", stiffness: 200 }}
            >
              <Zap size={26} className="text-primary" />
            </motion.div>
          )}
          <div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground/60 mb-0.5">
              <E id={`role-${role.id}-orgshort`}>{role.orgShort}</E>
            </div>
            <h3 className="text-lg font-bold text-foreground leading-tight">
              <E id={`role-${role.id}-role`}>{role.role}</E>
            </h3>
          </div>
        </div>

        {/* Period badge */}
        <motion.div
          className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full border"
          style={{ borderColor: role.accentColor + "60", color: role.accentColor, background: role.accentColor + "12" }}
          initial={{ opacity: 0, x: 10 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
          transition={{ delay: index * 0.15 + 0.4 }}
        >
          <E id={`role-${role.id}-period`}>{role.period}</E>
        </motion.div>
      </div>

      {/* Responsibilities */}
      <div className="px-6 py-5 flex-1">
        <div className="text-xs text-muted-foreground/50 mb-3 flex items-center gap-2">
          <Users size={11} />
          <span>Responsibilities</span>
        </div>
        <motion.ul
          className="space-y-2.5 mb-5"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: index * 0.15 + 0.4 } } }}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {role.responsibilities.map((item, i) => (
            <motion.li
              key={i}
              className="flex items-start gap-2.5 text-sm text-muted-foreground"
              variants={{ hidden: { opacity: 0, x: -16 }, visible: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 200, damping: 20 } } }}
            >
              <span className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: role.accentColor }} />
              <E id={`role-${role.id}-resp-${i}`}>{item}</E>
            </motion.li>
          ))}
        </motion.ul>

        {/* Tags */}
        <div className="flex items-center gap-2 flex-wrap pt-3 border-t border-white/5">
          <TagIcon size={13} style={{ color: role.accentColor }} className="flex-shrink-0" />
          <motion.div
            className="flex flex-wrap gap-1.5"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07, delayChildren: index * 0.15 + 0.7 } } }}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {role.tags.map((tag, ti) => (
              <motion.span
                key={tag}
                className="text-[11px] px-2.5 py-0.5 rounded-full border"
                style={{ borderColor: role.accentColor + "40", color: role.accentColor, background: role.accentColor + "0f" }}
                variants={{ hidden: { opacity: 0, scale: 0.7 }, visible: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 300 } } }}
              >
                <E id={`role-${role.id}-tag-${ti}`}>{tag}</E>
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Corner decorative accent */}
      <div
        className="absolute bottom-0 right-0 w-20 h-20 rounded-tl-full opacity-10 pointer-events-none"
        style={{ background: role.accentColor }}
      />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-t border-l rounded-tl-lg opacity-20 pointer-events-none" style={{ borderColor: role.accentColor }} />
    </motion.div>
  );
}

export default function Responsibilities() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: false });

  return (
    <section id="responsibilities" className="scroll-mt-24">
      <div ref={headingRef} className="mb-12">
        <motion.h2
          className="text-3xl font-bold flex items-center mb-3"
          initial={{ opacity: 0, y: -20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-primary mr-3 text-xl">// 06.</span>
          <E id="resp-heading">positions of responsibility</E>
        </motion.h2>
        <motion.div
          className="h-px bg-gradient-to-r from-primary/60 via-primary/20 to-transparent"
          initial={{ scaleX: 0 }}
          animate={headingInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ transformOrigin: "left" }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {roles.map((role, idx) => (
          <RoleCard key={role.id} role={role} index={idx} />
        ))}
      </div>
    </section>
  );
}
