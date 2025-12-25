interface Guest {
  firstName: string;
  lastName: string;
  role: string;
}

interface Party {
  guests: Guest[];
}

export const parties: Party[] = [
  {
    guests: [
      {
        firstName: 'First Name',
        lastName: 'Last Name',
        role: 'guest',
      },
      {
        firstName: 'First Name',
        lastName: 'Last Name',
        role: 'guest',
      },
      {
        firstName: 'First Name',
        lastName: 'Last Name',
        role: 'guest',
      },
    ],
  },
];
