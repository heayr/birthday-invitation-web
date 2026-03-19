import React from "react";
import { RsvpForm } from "../components/RsvpForm";

export const RsvpSection: React.FC = () => {
  return (
    <section
      style={{
        padding: "60px 24px",
        background: "var(--accent-bg)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h2
          style={{
            fontSize: "32px",
            textAlign: "center",
            marginBottom: "12px",
          }}
        >
          Подтвердите присутствие
        </h2>
        <p
          style={{
            textAlign: "center",
            marginBottom: "32px",
            color: "var(--text)",
            fontSize: "18px",
          }}
        >
          Пожалуйста, сообщите, сможете ли вы присоединиться к нам на
          праздновании
        </p>

        <RsvpForm />
      </div>
    </section>
  );
};
