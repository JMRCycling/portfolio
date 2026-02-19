/**
 * Sample data for Route Optimizer Demo
 * Pre-computed coordinates for Boise/Nampa area addresses
 * No API calls needed - demonstrates the algorithm without costs
 */

const HOME_BASE = {
    id: 'home',
    name: 'Home Base',
    address: '18463 Northside Blvd',
    city: 'Nampa, ID 83687',
    lat: 43.64082,
    lng: -116.5635,
    isHomeBase: true
};

const SAMPLE_ADDRESSES = [
    {
        id: 1,
        name: 'Johnson Residence',
        address: '2315 E Ustick Rd',
        city: 'Meridian, ID 83642',
        lat: 43.6185,
        lng: -116.3520,
        phone: '(208) 555-0101',
        notes: 'Gate code: 1234'
    },
    {
        id: 2,
        name: 'Smith Property',
        address: '1842 N Linder Rd',
        city: 'Kuna, ID 83634',
        lat: 43.4912,
        lng: -116.4198,
        phone: '(208) 555-0102',
        notes: 'Dog in backyard'
    },
    {
        id: 3,
        name: 'Williams Home',
        address: '3421 S Ten Mile Rd',
        city: 'Meridian, ID 83642',
        lat: 43.5823,
        lng: -116.4267,
        phone: '(208) 555-0103',
        notes: ''
    },
    {
        id: 4,
        name: 'Brown Residence',
        address: '892 W Cherry Ln',
        city: 'Meridian, ID 83642',
        lat: 43.6102,
        lng: -116.4015,
        phone: '(208) 555-0104',
        notes: 'Call when arriving'
    },
    {
        id: 5,
        name: 'Garcia Property',
        address: '4567 N Maple Grove',
        city: 'Boise, ID 83704',
        lat: 43.6345,
        lng: -116.2876,
        phone: '(208) 555-0105',
        notes: ''
    },
    {
        id: 6,
        name: 'Martinez Home',
        address: '1123 E Fairview Ave',
        city: 'Meridian, ID 83642',
        lat: 43.6127,
        lng: -116.3723,
        phone: '(208) 555-0106',
        notes: 'Side gate access'
    },
    {
        id: 7,
        name: 'Anderson Residence',
        address: '2890 N Star Rd',
        city: 'Nampa, ID 83651',
        lat: 43.5678,
        lng: -116.5234,
        phone: '(208) 555-0107',
        notes: ''
    },
    {
        id: 8,
        name: 'Taylor Property',
        address: '567 W Overland Rd',
        city: 'Meridian, ID 83642',
        lat: 43.5934,
        lng: -116.3945,
        phone: '(208) 555-0108',
        notes: 'Cash payment'
    },
    {
        id: 9,
        name: 'Thomas Home',
        address: '3345 S Eagle Rd',
        city: 'Meridian, ID 83642',
        lat: 43.5756,
        lng: -116.3534,
        phone: '(208) 555-0109',
        notes: ''
    },
    {
        id: 10,
        name: 'Moore Residence',
        address: '1456 Caldwell Blvd',
        city: 'Nampa, ID 83651',
        lat: 43.5523,
        lng: -116.5712,
        phone: '(208) 555-0110',
        notes: 'Large property - 20 min service'
    },
    {
        id: 11,
        name: 'Jackson Property',
        address: '2678 E Amity Rd',
        city: 'Meridian, ID 83642',
        lat: 43.5612,
        lng: -116.3421,
        phone: '(208) 555-0111',
        notes: ''
    },
    {
        id: 12,
        name: 'White Home',
        address: '789 N Middleton Rd',
        city: 'Nampa, ID 83651',
        lat: 43.5834,
        lng: -116.6123,
        phone: '(208) 555-0112',
        notes: 'New customer'
    }
];
