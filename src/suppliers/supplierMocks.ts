import type { Hotel } from '../types/index.js';

// Supplier A mock data
export const supplierA_Hotels: Hotel[] = [
  // Delhi
  { hotelId: 'a1', name: 'Grand Hyatt', price: 8500, city: 'delhi', commissionPct: 15 },
  { hotelId: 'a2', name: 'The Oberoi', price: 12000, city: 'delhi', commissionPct: 12 },
  { hotelId: 'a3', name: 'Radisson Blu', price: 6000, city: 'delhi', commissionPct: 18 },
  { hotelId: 'a4', name: 'Taj Palace', price: 9500, city: 'delhi', commissionPct: 14 },
  { hotelId: 'a5', name: 'Le Meridien', price: 7000, city: 'delhi', commissionPct: 16 },
  { hotelId: 'a6', name: 'JW Marriott', price: 10500, city: 'delhi', commissionPct: 13 },
  { hotelId: 'a7', name: 'Holiday Inn', price: 5500, city: 'delhi', commissionPct: 20 },
  { hotelId: 'a8', name: 'The Lalit', price: 8000, city: 'delhi', commissionPct: 17 },
  { hotelId: 'a9', name: 'Hyatt Regency', price: 8800, city: 'delhi', commissionPct: 15 },
  { hotelId: 'a10', name: 'Crowne Plaza', price: 7200, city: 'delhi', commissionPct: 18 },

  // Mumbai
  { hotelId: 'a11', name: 'Taj Mahal Palace', price: 15000, city: 'mumbai', commissionPct: 12 },
  { hotelId: 'a12', name: 'Trident Nariman Point', price: 9500, city: 'mumbai', commissionPct: 14 },
  { hotelId: 'a13', name: 'ITC Grand Central', price: 10500, city: 'mumbai', commissionPct: 15 },
  { hotelId: 'a14', name: 'The Oberoi Mumbai', price: 14500, city: 'mumbai', commissionPct: 13 },
  { hotelId: 'a15', name: 'Holiday Inn Mumbai', price: 7200, city: 'mumbai', commissionPct: 19 },

  // Bangalore
  { hotelId: 'a16', name: 'The Leela Palace', price: 14000, city: 'bangalore', commissionPct: 12 },
  { hotelId: 'a17', name: 'Taj West End', price: 11500, city: 'bangalore', commissionPct: 13 },
  { hotelId: 'a18', name: 'ITC Gardenia', price: 11000, city: 'bangalore', commissionPct: 14 },
  { hotelId: 'a19', name: 'Radisson Blu Bengaluru', price: 7500, city: 'bangalore', commissionPct: 16 },
  { hotelId: 'a20', name: 'Holiday Inn Bengaluru', price: 6800, city: 'bangalore', commissionPct: 18 },

  // Goa
  { hotelId: 'a21', name: 'W Goa', price: 17000, city: 'goa', commissionPct: 11 },
  { hotelId: 'a22', name: 'Taj Exotica', price: 16000, city: 'goa', commissionPct: 12 },
  { hotelId: 'a23', name: 'Park Hyatt Goa', price: 13500, city: 'goa', commissionPct: 14 },
  { hotelId: 'a24', name: 'Radisson Blu Goa', price: 9000, city: 'goa', commissionPct: 15 },
  { hotelId: 'a25', name: 'Holiday Inn Goa', price: 8500, city: 'goa', commissionPct: 17 },
];

// Supplier B mock data
export const supplierB_Hotels: Hotel[] = [
  // Delhi
  { hotelId: 'b1', name: 'Grand Hyatt', price: 8200, city: 'delhi', commissionPct: 17 }, // cheaper
  { hotelId: 'b2', name: 'ITC Maurya', price: 11000, city: 'delhi', commissionPct: 14 },
  { hotelId: 'b3', name: 'Radisson Blu', price: 6500, city: 'delhi', commissionPct: 16 },
  { hotelId: 'b4', name: 'Taj Palace', price: 9700, city: 'delhi', commissionPct: 13 },
  { hotelId: 'b5', name: 'Le Meridien', price: 6900, city: 'delhi', commissionPct: 15 }, // cheaper
  { hotelId: 'b6', name: 'JW Marriott', price: 10200, city: 'delhi', commissionPct: 14 }, // cheaper
  { hotelId: 'b7', name: 'Holiday Inn Express', price: 5300, city: 'delhi', commissionPct: 19 }, // variation
  { hotelId: 'b8', name: 'The Lalit', price: 8200, city: 'delhi', commissionPct: 16 },
  { hotelId: 'b9', name: 'Hyatt Regency', price: 8600, city: 'delhi', commissionPct: 15 }, // cheaper
  { hotelId: 'b10', name: 'Novotel', price: 7500, city: 'delhi', commissionPct: 17 },

  // Mumbai
  { hotelId: 'b11', name: 'Taj Mahal Palace', price: 14800, city: 'mumbai', commissionPct: 13 }, // cheaper
  { hotelId: 'b12', name: 'Trident Nariman Point', price: 9300, city: 'mumbai', commissionPct: 15 }, // cheaper
  { hotelId: 'b13', name: 'ITC Grand Central', price: 10800, city: 'mumbai', commissionPct: 14 },
  { hotelId: 'b14', name: 'The Oberoi Mumbai', price: 14200, city: 'mumbai', commissionPct: 12 }, // cheaper
  { hotelId: 'b15', name: 'Holiday Inn Express Mumbai', price: 6900, city: 'mumbai', commissionPct: 18 }, // variation

  // Bangalore
  { hotelId: 'b16', name: 'The Leela Palace', price: 13800, city: 'bangalore', commissionPct: 13 }, // cheaper
  { hotelId: 'b17', name: 'Taj West End', price: 11300, city: 'bangalore', commissionPct: 12 }, // cheaper
  { hotelId: 'b18', name: 'ITC Gardenia', price: 11500, city: 'bangalore', commissionPct: 15 },
  { hotelId: 'b19', name: 'Radisson Blu Bengaluru', price: 7700, city: 'bangalore', commissionPct: 14 },
  { hotelId: 'b20', name: 'Novotel Bengaluru', price: 7200, city: 'bangalore', commissionPct: 16 }, // unique

  // Goa
  { hotelId: 'b21', name: 'W Goa', price: 16500, city: 'goa', commissionPct: 12 }, // cheaper
  { hotelId: 'b22', name: 'Taj Exotica', price: 16200, city: 'goa', commissionPct: 13 },
  { hotelId: 'b23', name: 'Park Hyatt Goa', price: 13200, city: 'goa', commissionPct: 15 }, // cheaper
  { hotelId: 'b24', name: 'Radisson Blu Goa', price: 9200, city: 'goa', commissionPct: 16 },
  { hotelId: 'b25', name: 'Novotel Goa', price: 8800, city: 'goa', commissionPct: 18 }, // unique
];
