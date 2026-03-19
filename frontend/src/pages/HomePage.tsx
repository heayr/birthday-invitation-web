import React from "react";
import { RsvpSection } from "../sections/RsvpSection";

export const HomePage: React.FC = () => {
  return (
    <main>
      {/* Hero секция */}
      <section
        style={{
          padding: "80px 24px",
          textAlign: "center",
          background: "var(--bg)",
        }}
      >
        <h1 style={{ fontSize: "64px", marginBottom: "16px" }}>
          День Рождения! 🎉
        </h1>
        <p
          style={{
            fontSize: "24px",
            color: "var(--text)",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          Приглашаем вас отпраздновать этот особенный день вместе с нами
        </p>

        {/* Счетчик */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "24px",
            marginTop: "48px",
          }}
        >
          <div className="counter" style={{ flexDirection: "column" }}>
            <span style={{ fontSize: "48px", fontWeight: "bold" }}>15</span>
            <span>Дней</span>
          </div>
          <div className="counter" style={{ flexDirection: "column" }}>
            <span style={{ fontSize: "48px", fontWeight: "bold" }}>08</span>
            <span>Часов</span>
          </div>
          <div className="counter" style={{ flexDirection: "column" }}>
            <span style={{ fontSize: "48px", fontWeight: "bold" }}>24</span>
            <span>Минут</span>
          </div>
        </div>
      </section>

      {/* Информация о мероприятии */}
      <section
        style={{
          padding: "60px 24px",
          background: "var(--code-bg)",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "32px",
              textAlign: "center",
              marginBottom: "40px",
            }}
          >
            Детали мероприятия
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "24px",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "32px", marginBottom: "8px" }}>📅</div>
              <h3>Дата</h3>
              <p>15 августа 2026</p>
              <p style={{ fontSize: "14px" }}>Суббота</p>
            </div>

            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "32px", marginBottom: "8px" }}>⏰</div>
              <h3>Время</h3>
              <p>17:00</p>
              <p style={{ fontSize: "14px" }}>Сбор гостей</p>
            </div>

            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "32px", marginBottom: "8px" }}>📍</div>
              <h3>Место</h3>
              <p>Ресторан "Особый"</p>
              <p style={{ fontSize: "14px" }}>ул. Примерная, 123</p>
            </div>
          </div>
        </div>
      </section>

      {/* RSVP секция */}
      <RsvpSection />
    </main>
  );
};
