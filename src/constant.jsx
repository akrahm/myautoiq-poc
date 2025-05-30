export const generateMockData = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `comm-${i + 1}`,
    type: i % 2 === 0 ? 'email' : 'call',
    timestamp: `2025-01-${(i % 30 + 1).toString().padStart(2, '0')}T10:00:00Z`,
    content: `This is a sample ${i % 2 === 0 ? 'email' : 'call'} communication #${i + 1}.`,
  }));
};

export const mockLeads = [
  {
    customer: {
      id: 'cust-001',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '555-1234',
    },
    dealer: {
      id: 'dealer-001',
      name: 'Altoona Honda',
      interestedIn: '2023 Honda Civic',
      dealConfirmedIn: '2024 Honda civic'
    },
    dealStatus: 'Sold',
    lostToPickedDate: '2025-02-01T09:30:00Z',
    pickedToSoldDate: '2025-03-18T17:20:00Z',
    communicationHistory: generateMockData(10),
  },
  {
    customer: {
      id: 'cust-002',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '555-5678',
    },
    dealer: {
      id: 'dealer-002',
      name: 'Chapman Honda',
      interestedIn: '2023 Honda Civic',
      dealConfirmedIn: ''
    },
    dealStatus: 'In Progress',
    lostToPickedDate: '2025-03-03T11:45:00Z',
    pickedToSoldDate: '',
    communicationHistory: generateMockData(15),
  },
  {
    customer: {
      id: 'cust-003',
      name: 'Mark Johnson',
      email: 'mark.j@example.com',
      phone: '555-8765',
    },
    dealer: {
      id: 'dealer-003',
      name: 'Precision Toyota',
      interestedIn: '2023 Honda Civic',
      dealConfirmedIn: '2024 Honda civic'
    },
    dealStatus: 'Sold',
    communicationHistory: generateMockData(7),
  },
];