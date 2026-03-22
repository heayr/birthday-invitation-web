// src/sections/InfoSection.tsx
import { Calendar, MapPin, Shirt, UtensilsCrossed } from "lucide-react";
import "./../styles/components/InfoSection.css";

export function InfoSection() {
  return (
    <section className="info-section">
      <div className="info-container">
        <div className="info-wrapper">
          <h2 className="info-title">Информация о событии</h2>

          <div className="info-grid">
            {/* Карточка: Дата и время */}
            <div className="info-card">
              <div className="info-card-header">
                <div className="info-icon-wrapper">
                  <Calendar aria-hidden="true" />
                </div>
                <h3 className="info-card-title">Дата и время</h3>
              </div>
              <div className="info-card-content">
                <p className="info-main-text">30 мая 2026</p>
                <p className="info-sub-text">17:00 – 23:00</p>
              </div>
            </div>

            {/* Карточка: Место */}
            <div className="info-card">
              <div className="info-card-header">
                <div className="info-icon-wrapper">
                  <MapPin aria-hidden="true" />
                </div>
                <h3 className="info-card-title">Место</h3>
              </div>
              <div className="info-card-content">
                <p className="info-main-text">Балаково</p>
                <p className="info-sub-text">
                  Кафе «Золотой Ключик» <br />
                  просп. Героев, 36/2, ТЦ Айсберг
                </p>
              </div>
            </div>

            {/* Карточка: Дресс-код */}
            <div className="info-card">
              <div className="info-card-header">
                <div className="info-icon-wrapper">
                  <Shirt aria-hidden="true" />
                </div>
                <h3 className="info-card-title">Дресс-код</h3>
              </div>
              <div className="info-card-content">
                <p className="info-main-text">Уточняется</p>
                <p className="info-sub-text">Будет объявлено позже</p>
              </div>
            </div>

            {/* Карточка: Формат */}
            <div className="info-card">
              <div className="info-card-header">
                <div className="info-icon-wrapper">
                  <UtensilsCrossed aria-hidden="true" />
                </div>
                <h3 className="info-card-title">Формат</h3>
              </div>
              <div className="info-card-content">
                <p className="info-main-text">Фуршет</p>
                <p className="info-sub-text">
                  Лёгкие закуски, общение, хорошее настроение
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
