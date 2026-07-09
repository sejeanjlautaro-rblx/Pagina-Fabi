/**
 * DATA.JS
 * -----------------------------------------------------------------
 * Datos de ejemplo (mock) para poder diseñar y probar la página
 * sin depender todavía de la base de datos.
 *
 * IMPORTANTE PARA MÁS ADELANTE:
 * Cada array de acá abajo está pensado para calzar 1 a 1 con una
 * tabla futura en Supabase. Cuando conectemos la base, la idea es
 * reemplazar estas constantes por un fetch a Supabase, por ejemplo:
 *
 *   const { data: PLAYERS } = await supabase.from('players').select('*')
 *
 * y el resto del código (que arma la tabla, las llaves, etc.) no
 * debería cambiar casi nada, porque ya está armado a partir de
 * estos mismos nombres de campo (id, name, category, points...).
 * -----------------------------------------------------------------
 */

// Categorías disponibles, de mejor a peor nivel.
// "C" = Caballeros, "D" = Damas. C1/D1 es la categoría más alta.
const CATEGORIES = [
  { code: 'C1', label: 'C1', group: 'caballero' },
  { code: 'C2', label: 'C2', group: 'caballero' },
  { code: 'C3', label: 'C3', group: 'caballero' },
  { code: 'C4', label: 'C4', group: 'caballero' },
  { code: 'C5', label: 'C5', group: 'caballero' },
  { code: 'C6', label: 'C6', group: 'caballero' },
  { code: 'C7', label: 'C7', group: 'caballero' },
  { code: 'C8', label: 'C8', group: 'caballero' },
  { code: 'C9', label: 'C9', group: 'caballero' },
  { code: 'D1', label: 'D1', group: 'dama' },
  { code: 'D2', label: 'D2', group: 'dama' },
  { code: 'D3', label: 'D3', group: 'dama' },
  { code: 'D4', label: 'D4', group: 'dama' },
  { code: 'D5', label: 'D5', group: 'dama' },
  { code: 'D6', label: 'D6', group: 'dama' },
  { code: 'D7', label: 'D7', group: 'dama' },
  { code: 'D8', label: 'D8', group: 'dama' },
  { code: 'D9', label: 'D9', group: 'dama' },
];

// Tabla "players" — un jugador por fila.
// trend: 'up' | 'down' | 'same' respecto a la fecha anterior.
const PLAYERS = [
  { id: 1, name: 'Fabián Torres', category: 'C3', points: 1280, trend: 'up' },
  { id: 2, name: 'Nicolás Ríos', category: 'C3', points: 1195, trend: 'same' },
  { id: 3, name: 'Julián Sosa', category: 'C3', points: 1140, trend: 'up' },
  { id: 4, name: 'Martín Paz', category: 'C3', points: 1080, trend: 'down' },
  { id: 5, name: 'Ezequiel Luna', category: 'C3', points: 990, trend: 'up' },
  { id: 6, name: 'Diego Molina', category: 'C3', points: 940, trend: 'down' },
  { id: 7, name: 'Lucas Herrera', category: 'C3', points: 875, trend: 'same' },
  { id: 8, name: 'Santiago Ibáñez', category: 'C3', points: 810, trend: 'down' },

  { id: 9, name: 'Rocío Fernández', category: 'D2', points: 1310, trend: 'up' },
  { id: 10, name: 'Camila Ortiz', category: 'D2', points: 1250, trend: 'up' },
  { id: 11, name: 'Valentina Cruz', category: 'D2', points: 1190, trend: 'same' },
  { id: 12, name: 'Agustina Vera', category: 'D2', points: 1105, trend: 'down' },
  { id: 13, name: 'Milagros Peña', category: 'D2', points: 1020, trend: 'up' },
  { id: 14, name: 'Sofía Aguirre', category: 'D2', points: 955, trend: 'down' },

  { id: 15, name: 'Bruno Acosta', category: 'C1', points: 1520, trend: 'same' },
  { id: 16, name: 'Federico Campos', category: 'C1', points: 1465, trend: 'up' },
  { id: 17, name: 'Tomás Godoy', category: 'C1', points: 1400, trend: 'down' },
  { id: 18, name: 'Ramiro Silva', category: 'C1', points: 1330, trend: 'up' },

  { id: 19, name: 'Guadalupe Ríos', category: 'D1', points: 1490, trend: 'up' },
  { id: 20, name: 'Micaela Funes', category: 'D1', points: 1420, trend: 'same' },
  { id: 21, name: 'Antonella Rey', category: 'D1', points: 1355, trend: 'down' },

  { id: 22, name: 'Ignacio Bravo', category: 'C6', points: 690, trend: 'up' },
  { id: 23, name: 'Facundo Leiva', category: 'C6', points: 640, trend: 'down' },
  { id: 24, name: 'Emanuel Duarte', category: 'C6', points: 605, trend: 'same' },
];

// Tabla "bracket_matches" — partidos de las llaves por categoría.
// round: número de ronda (1 = primera ronda). slot: posición dentro de la ronda.
const BRACKETS = {
  C3: {
    rounds: [
      {
        title: 'Octavos',
        matches: [
          { a: 'F. Torres', b: 'L. Ibarra', scoreA: '6-3', scoreB: '4-6', winner: 'a' },
          { a: 'N. Ríos', b: 'P. Cabral', scoreA: '6-2', scoreB: '3-6', winner: 'a' },
          { a: 'J. Sosa', b: 'R. Medina', scoreA: '7-5', scoreB: '5-7', winner: 'a' },
          { a: 'M. Paz', b: 'D. Molina', scoreA: '4-6', scoreB: '6-4', winner: 'b' },
        ],
      },
      {
        title: 'Cuartos',
        matches: [
          { a: 'F. Torres', b: 'N. Ríos', scoreA: '6-4', scoreB: '3-6', winner: 'a' },
          { a: 'J. Sosa', b: 'D. Molina', scoreA: '6-2', scoreB: '6-3', winner: 'a' },
        ],
      },
      {
        title: 'Semifinal',
        matches: [
          { a: 'F. Torres', b: 'J. Sosa', scoreA: '6-4', scoreB: '6-4', winner: 'a' },
        ],
      },
    ],
    champion: 'Fabián Torres',
  },
  D2: {
    rounds: [
      {
        title: 'Cuartos',
        matches: [
          { a: 'R. Fernández', b: 'S. Aguirre', scoreA: '6-1', scoreB: '2-6', winner: 'a' },
          { a: 'C. Ortiz', b: 'M. Peña', scoreA: '6-3', scoreB: '6-4', winner: 'a' },
        ],
      },
      {
        title: 'Semifinal',
        matches: [
          { a: 'R. Fernández', b: 'C. Ortiz', scoreA: '6-3', scoreB: '6-2', winner: 'a' },
        ],
      },
    ],
    champion: null,
  },
};

// Tabla "prizes"
const PRIZES = [
  { place: '1er puesto', prize: 'Paletero + 2 grips + inscripción bonificada', place_class: 'first' },
  { place: '2do puesto', prize: 'Set de grips + 20% off próxima inscripción', place_class: 'second' },
  { place: '3er puesto', prize: 'Lata de bochas premium', place_class: 'third' },
];

// Tabla "rules"
const RULES = [
  'Los partidos se juegan al mejor de 3 sets, con tie-break en cada set y súper tie-break en el tercero.',
  'Cada jugador debe confirmar su presencia con al menos 24hs de anticipación al horario asignado.',
  'La inasistencia sin aviso se penaliza con la pérdida del partido por W.O. y descuento de puntos.',
  'Los puntos del ranking se actualizan al finalizar cada fecha y definen la categoría del próximo período.',
  'Ante lesión o fuerza mayor, avisar al profesor para reprogramar dentro de la misma semana.',
];
