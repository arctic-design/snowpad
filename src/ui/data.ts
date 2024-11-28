export const complexDataStructure = [
  {
    person: {
      name: 'Epsilon',
      age: 42,
      address: [
        {
          street: '202 Park Ave',
          city: 'Boston',
          country: 'Germany',
        },
        {
          street: '74 Broadway',
          city: 'Bengaluru',
          country: 'Germany',
        },
      ],
      roles: [
        {
          designation: 'Team Lead',
          level: 'L2',
        },
        {
          designation: 'Team Lead',
          level: 'L4',
        },
      ],
      metadata: {
        skills: ['Alpha', 'Zeta', 'Gamma'],
        experience: '20 years',
      },
      organization: {
        name: 'Alpha',
        children: [
          {
            name: 'Zeta',
            children: [
              {
                name: 'Epsilon',
                children: ['stone', 'stone', 'stone', 'stone'],
              },
              {
                name: 'Delta',
                children: ['stone', 'stone'],
              },
              {
                name: 'Beta',
                children: ['stone', 'stone', 'stone', 'stone'],
              },
              {
                name: 'Alpha',
                children: ['stone', 'stone', 'stone', 'stone'],
              },
            ],
          },
          {
            name: 'Epsilon',
            children: [
              {
                name: 'Gamma',
                children: ['stone', 'stone', 'stone', 'stone'],
              },
              {
                name: 'Zeta',
                children: ['stone', 'stone', 'stone'],
              },
            ],
          },
        ],
      },
    },
  },
  {
    person: {
      name: 'Delta',
      age: 31,
      address: [
        {
          street: '320 Park Ave',
          city: 'Bengaluru',
          country: 'USA',
        },
        {
          street: '957 Broadway',
          city: 'Bengaluru',
          country: 'Canada',
        },
        {
          street: '220 Hosur Rd',
          city: 'Boston',
          country: 'India',
        },
      ],
      roles: [
        {
          designation: 'Software Engg',
          level: 'L5',
        },
        {
          designation: 'Manager',
          level: 'L3',
        },
        {
          designation: 'Architect',
          level: 'L2',
        },
      ],
      metadata: {
        skills: ['Zeta', 'Beta', 'Beta'],
        experience: '11 years',
      },
      organization: {
        name: 'Alpha',
        children: [
          {
            name: 'Alpha',
            children: [
              {
                name: 'Delta',
                children: ['stone', 'stone'],
              },
              {
                name: 'Beta',
                children: ['stone', 'stone'],
              },
              {
                name: 'Beta',
                children: ['stone', 'stone', 'stone', 'stone'],
              },
              {
                name: 'Zeta',
                children: ['stone', 'stone'],
              },
            ],
          },
          {
            name: 'Epsilon',
            children: [
              {
                name: 'Epsilon',
                children: ['stone', 'stone', 'stone', 'stone'],
              },
              {
                name: 'Zeta',
                children: ['stone', 'stone'],
              },
            ],
          },
          {
            name: 'Alpha',
            children: [
              {
                name: 'Gamma',
                children: ['stone', 'stone', 'stone'],
              },
              {
                name: 'Zeta',
                children: ['stone', 'stone'],
              },
            ],
          },
          {
            name: 'Beta',
            children: [
              {
                name: 'Zeta',
                children: ['stone', 'stone', 'stone', 'stone'],
              },
              {
                name: 'Gamma',
                children: ['stone', 'stone', 'stone', 'stone'],
              },
              {
                name: 'Delta',
                children: ['stone', 'stone', 'stone', 'stone'],
              },
              {
                name: 'Zeta',
                children: ['stone', 'stone'],
              },
            ],
          },
        ],
      },
    },
  },
  {
    person: {
      name: 'Zeta',
      age: 37,
      address: [
        {
          street: '841 Elm St',
          city: 'Seattle',
          country: 'USA',
        },
        {
          street: '959 Hosur Rd',
          city: 'Boston',
          country: 'Australia',
        },
        {
          street: '808 Broadway',
          city: 'Boston',
          country: 'India',
        },
      ],
      roles: [
        {
          designation: 'Team Lead',
          level: 'L5',
        },
        {
          designation: 'Team Lead',
          level: 'L2',
        },
        {
          designation: 'Team Lead',
          level: 'L5',
        },
      ],
      metadata: {
        skills: ['Delta', 'Beta', 'Epsilon'],
        experience: '19 years',
      },
      organization: {
        name: 'Delta',
        children: [
          {
            name: 'Delta',
            children: [
              {
                name: 'Zeta',
                children: ['stone', 'stone', 'stone'],
              },
              {
                name: 'Beta',
                children: ['stone', 'stone'],
              },
            ],
          },
          {
            name: 'Zeta',
            children: [
              {
                name: 'Zeta',
                children: ['stone', 'stone', 'stone'],
              },
              {
                name: 'Zeta',
                children: ['stone', 'stone', 'stone'],
              },
              {
                name: 'Delta',
                children: ['stone', 'stone', 'stone', 'stone'],
              },
            ],
          },
          {
            name: 'Delta',
            children: [
              {
                name: 'Delta',
                children: ['stone', 'stone', 'stone'],
              },
              {
                name: 'Beta',
                children: ['stone', 'stone', 'stone', 'stone'],
              },
            ],
          },
          {
            name: 'Beta',
            children: [
              {
                name: 'Zeta',
                children: ['stone', 'stone', 'stone', 'stone'],
              },
              {
                name: 'Alpha',
                children: ['stone', 'stone', 'stone', 'stone'],
              },
              {
                name: 'Epsilon',
                children: ['stone', 'stone'],
              },
              {
                name: 'Alpha',
                children: ['stone', 'stone', 'stone', 'stone'],
              },
            ],
          },
        ],
      },
    },
  },
];

export const companyOrgDataStructure = {
  company: {
    name: 'TechCorp',
    ceo: {
      name: 'Jane Doe',
      role: 'CEO',
    },
    departments: [
      {
        name: 'Engineering',
        house: 'Gryffindor',
        manager: {
          name: 'Alice Johnson',
          role: 'VP of Engineering',
        },
        teams: [
          {
            name: 'Frontend Team',
            lead: {
              name: 'John Smith',
              role: 'Frontend Lead',
            },
            members: [
              { name: 'Emma Davis', role: 'Senior Frontend Engineer' },
              { name: 'James Lee', role: 'Frontend Engineer' },
            ],
          },
          {
            name: 'Backend Team',
            lead: {
              name: 'Michael Brown',
              role: 'Backend Lead',
            },
            members: [
              { name: 'Sophia Wilson', role: 'Senior Backend Engineer' },
              { name: 'Oliver Miller', role: 'Backend Engineer' },
            ],
          },
        ],
      },
      {
        name: 'Marketing',
        house: 'Ravenclaw',
        manager: {
          name: 'Rachel Green',
          role: 'VP of Marketing',
        },
        teams: [
          {
            name: 'SEO Team',
            lead: {
              name: 'Chris White',
              role: 'SEO Lead',
            },
            members: [
              { name: 'Isabella Harris', role: 'SEO Specialist' },
              { name: 'Mason Martin', role: 'Content Strategist' },
            ],
          },
          {
            name: 'Social Media Team',
            lead: {
              name: 'Emily Moore',
              role: 'Social Media Lead',
            },
            members: [
              { name: 'Lucas Anderson', role: 'Social Media Manager' },
              { name: 'Ethan Walker', role: 'Social Media Coordinator' },
            ],
          },
        ],
      },
      {
        name: 'Sales',
        house: 'Hufflepuff',
        manager: {
          name: 'Robert Brown',
          role: 'VP of Sales',
        },
        teams: [
          {
            name: 'Enterprise Sales',
            lead: {
              name: 'Laura Scott',
              role: 'Enterprise Sales Lead',
            },
            members: [
              { name: 'Alex Turner', role: 'Sales Executive' },
              { name: 'Mia Carter', role: 'Sales Representative' },
            ],
          },
          {
            name: 'SMB Sales',
            lead: {
              name: 'Henry Adams',
              role: 'SMB Sales Lead',
            },
            members: [
              { name: 'Ella Taylor', role: 'Sales Executive' },
              { name: 'Noah Martinez', role: 'Sales Representative' },
            ],
          },
        ],
      },
      {
        name: 'Finance',
        house: 'Slytherin',
        manager: {
          name: 'William King',
          role: 'Chief Financial Officer',
        },
        teams: [
          {
            name: 'Accounting Team',
            lead: {
              name: 'Anna White',
              role: 'Accounting Lead',
            },
            members: [
              { name: 'Olivia Harris', role: 'Accountant' },
              { name: 'Liam Hill', role: 'Junior Accountant' },
            ],
          },
          {
            name: 'Payroll Team',
            lead: {
              name: 'Grace Robinson',
              role: 'Payroll Lead',
            },
            members: [
              { name: 'Ava Nelson', role: 'Payroll Specialist' },
              { name: 'Benjamin Clark', role: 'Payroll Assistant' },
            ],
          },
        ],
      },
    ],
  },
};

export const simpleDataStructure = {
  squadName: 'Super hero squad',
  homeTown: 'Metro City',
  formed: 2016,
  secretBase: 'Super tower',
  active: true,
  members: [
    {
      name: 'Molecule Man',
      age: 29,
      secretIdentity: 'Dan Jukes',
      powers: ['Radiation resistance', 'Turning tiny', 'Radiation blast'],
    },
    {
      name: 'Madame Uppercut',
      age: 39,
      secretIdentity: 'Jane Wilson',
      powers: [
        'Million tonne punch',
        'Damage resistance',
        'Superhuman reflexes',
      ],
    },
    {
      name: 'Eternal Flame',
      age: 1000000,
      secretIdentity: 'Unknown',
      powers: [
        'Immortality',
        'Heat Immunity',
        'Inferno',
        'Teleportation',
        'Interdimensional travel',
      ],
    },
  ],
};
