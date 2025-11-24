'use client';

import { useState } from 'react';

type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

const faqData: FAQItem[] = [
  {
    id: 'faq-1',
    question: '¿Cómo funciona el alquiler?',
    answer: 'Elige tu prenda, selecciona las fechas y envía la solicitud. Te confirmaremos por correo la disponibilidad y los siguientes pasos.',
  },
  {
    id: 'faq-2',
    question: '¿Incluye limpieza?',
    answer: 'Sí, la limpieza está incluida en todos los alquileres.',
  },
  {
    id: 'faq-3',
    question: '¿Cuánto tiempo puedo alquilar?',
    answer: 'Entre 2 y 7 días. Si necesitas más tiempo, contáctanos.',
  },
  {
    id: 'faq-4',
    question: '¿Necesito crear una cuenta?',
    answer: 'No. Solo completa el formulario con tus datos y fechas.',
  },
];

export default function FAQPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900 dark:from-slate-950 dark:to-slate-900 dark:text-slate-100">
      <header className="sticky top-0 z-30 backdrop-blur bg-white/70 dark:bg-slate-950/60 border-b border-slate-200/60 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="/" className="font-extrabold text-xl tracking-tight">
            GlamRent
          </a>
          <a href="/" className="text-sm hover:text-fuchsia-600">
            ← Back to home
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Preguntas Frecuentes</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Encuentra respuestas a las preguntas más comunes sobre nuestro servicio de alquiler.
          </p>
        </div>

        <div className="space-y-3">
          {faqData.map((item) => (
            <div
              key={item.id}
              className="rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(item.id)}
                className="w-full text-left px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-900 flex items-center justify-between transition-colors"
              >
                <h2 className="font-semibold pr-4" data-testid="faq-question">
                  {item.question}
                </h2>
                <svg
                  className={`w-5 h-5 flex-shrink-0 transition-transform ${
                    expandedId === item.id ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </button>

              {expandedId === item.id && (
                <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
                  <p className="text-slate-700 dark:text-slate-300" data-testid="faq-answer">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 rounded-lg bg-fuchsia-50 dark:bg-fuchsia-950 border border-fuchsia-200 dark:border-fuchsia-800">
          <h3 className="font-semibold text-fuchsia-900 dark:text-fuchsia-100 mb-2">
            ¿No encontraste lo que buscas?
          </h3>
          <p className="text-fuchsia-800 dark:text-fuchsia-200 text-sm mb-3">
            Estamos aquí para ayudarte. Contáctanos si tienes más preguntas.
          </p>
          <a
            href="/"
            className="inline-flex items-center rounded-lg bg-fuchsia-600 text-white px-4 py-2 text-sm font-medium hover:bg-fuchsia-500"
          >
            Contacto
          </a>
        </div>
      </main>
    </div>
  );
}
