'use client';

import React, { useEffect, useState } from 'react';
import { JSONEditor } from '@/ui/JSONEditor';
import { FlowViewer } from '@/ui/FlowViewer';
import { validateJSON } from '@/utility/validateJSON';
import { Box } from '@arctic-kit/snow';

const initialJson = `[
  {
    "person": {
      "name": "Epsilon",
      "age": 42,
      "address": [
        {
          "street": "202 Park Ave",
          "city": "Boston",
          "country": "Germany"
        },
        {
          "street": "74 Broadway",
          "city": "Bengaluru",
          "country": "Germany"
        }
      ],
      "roles": [
        {
          "designation": "Team Lead",
          "level": "L2"
        },
        {
          "designation": "Team Lead",
          "level": "L4"
        }
      ],
      "metadata": {
        "skills": [
          "Alpha",
          "Zeta",
          "Gamma"
        ],
        "experience": "20 years"
      },
      "organization": {
        "name": "Alpha",
        "children": [
          {
            "name": "Zeta",
            "children": [
              {
                "name": "Epsilon",
                "children": [
                  "stone",
                  "stone",
                  "stone",
                  "stone"
                ]
              },
              {
                "name": "Delta",
                "children": [
                  "stone",
                  "stone"
                ]
              },
              {
                "name": "Beta",
                "children": [
                  "stone",
                  "stone",
                  "stone",
                  "stone"
                ]
              },
              {
                "name": "Alpha",
                "children": [
                  "stone",
                  "stone",
                  "stone",
                  "stone"
                ]
              }
            ]
          },
          {
            "name": "Epsilon",
            "children": [
              {
                "name": "Gamma",
                "children": [
                  "stone",
                  "stone",
                  "stone",
                  "stone"
                ]
              },
              {
                "name": "Zeta",
                "children": [
                  "stone",
                  "stone",
                  "stone"
                ]
              }
            ]
          }
        ]
      }
    }
  },
  {
    "person": {
      "name": "Delta",
      "age": 31,
      "address": [
        {
          "street": "320 Park Ave",
          "city": "Bengaluru",
          "country": "USA"
        },
        {
          "street": "957 Broadway",
          "city": "Bengaluru",
          "country": "Canada"
        },
        {
          "street": "220 Hosur Rd",
          "city": "Boston",
          "country": "India"
        }
      ],
      "roles": [
        {
          "designation": "Software Engg",
          "level": "L5"
        },
        {
          "designation": "Manager",
          "level": "L3"
        },
        {
          "designation": "Architect",
          "level": "L2"
        }
      ],
      "metadata": {
        "skills": [
          "Zeta",
          "Beta",
          "Beta"
        ],
        "experience": "11 years"
      },
      "organization": {
        "name": "Alpha",
        "children": [
          {
            "name": "Alpha",
            "children": [
              {
                "name": "Delta",
                "children": [
                  "stone",
                  "stone"
                ]
              },
              {
                "name": "Beta",
                "children": [
                  "stone",
                  "stone"
                ]
              },
              {
                "name": "Beta",
                "children": [
                  "stone",
                  "stone",
                  "stone",
                  "stone"
                ]
              },
              {
                "name": "Zeta",
                "children": [
                  "stone",
                  "stone"
                ]
              }
            ]
          },
          {
            "name": "Epsilon",
            "children": [
              {
                "name": "Epsilon",
                "children": [
                  "stone",
                  "stone",
                  "stone",
                  "stone"
                ]
              },
              {
                "name": "Zeta",
                "children": [
                  "stone",
                  "stone"
                ]
              }
            ]
          },
          {
            "name": "Alpha",
            "children": [
              {
                "name": "Gamma",
                "children": [
                  "stone",
                  "stone",
                  "stone"
                ]
              },
              {
                "name": "Zeta",
                "children": [
                  "stone",
                  "stone"
                ]
              }
            ]
          },
          {
            "name": "Beta",
            "children": [
              {
                "name": "Zeta",
                "children": [
                  "stone",
                  "stone",
                  "stone",
                  "stone"
                ]
              },
              {
                "name": "Gamma",
                "children": [
                  "stone",
                  "stone",
                  "stone",
                  "stone"
                ]
              },
              {
                "name": "Delta",
                "children": [
                  "stone",
                  "stone",
                  "stone",
                  "stone"
                ]
              },
              {
                "name": "Zeta",
                "children": [
                  "stone",
                  "stone"
                ]
              }
            ]
          }
        ]
      }
    }
  },
  {
    "person": {
      "name": "Zeta",
      "age": 37,
      "address": [
        {
          "street": "841 Elm St",
          "city": "Seattle",
          "country": "USA"
        },
        {
          "street": "959 Hosur Rd",
          "city": "Boston",
          "country": "Australia"
        },
        {
          "street": "808 Broadway",
          "city": "Boston",
          "country": "India"
        }
      ],
      "roles": [
        {
          "designation": "Team Lead",
          "level": "L5"
        },
        {
          "designation": "Team Lead",
          "level": "L2"
        },
        {
          "designation": "Team Lead",
          "level": "L5"
        }
      ],
      "metadata": {
        "skills": [
          "Delta",
          "Beta",
          "Epsilon"
        ],
        "experience": "19 years"
      },
      "organization": {
        "name": "Delta",
        "children": [
          {
            "name": "Delta",
            "children": [
              {
                "name": "Zeta",
                "children": [
                  "stone",
                  "stone",
                  "stone"
                ]
              },
              {
                "name": "Beta",
                "children": [
                  "stone",
                  "stone"
                ]
              }
            ]
          },
          {
            "name": "Zeta",
            "children": [
              {
                "name": "Zeta",
                "children": [
                  "stone",
                  "stone",
                  "stone"
                ]
              },
              {
                "name": "Zeta",
                "children": [
                  "stone",
                  "stone",
                  "stone"
                ]
              },
              {
                "name": "Delta",
                "children": [
                  "stone",
                  "stone",
                  "stone",
                  "stone"
                ]
              }
            ]
          },
          {
            "name": "Delta",
            "children": [
              {
                "name": "Delta",
                "children": [
                  "stone",
                  "stone",
                  "stone"
                ]
              },
              {
                "name": "Beta",
                "children": [
                  "stone",
                  "stone",
                  "stone",
                  "stone"
                ]
              }
            ]
          },
          {
            "name": "Beta",
            "children": [
              {
                "name": "Zeta",
                "children": [
                  "stone",
                  "stone",
                  "stone",
                  "stone"
                ]
              },
              {
                "name": "Alpha",
                "children": [
                  "stone",
                  "stone",
                  "stone",
                  "stone"
                ]
              },
              {
                "name": "Epsilon",
                "children": [
                  "stone",
                  "stone"
                ]
              },
              {
                "name": "Alpha",
                "children": [
                  "stone",
                  "stone",
                  "stone",
                  "stone"
                ]
              }
            ]
          }
        ]
      }
    }
  }
]

`;

const JSONViewerScreen: React.FC = () => {
  const [jsonInput, setJsonInput] = useState(initialJson);
  const [jsonData, setJsonData] = useState({});
  const [error, setError] = useState('');

  // Initialize `jsonData` with the parsed `initialJson`
  useEffect(() => {
    const [isValid, parsedOrError] = validateJSON(initialJson);
    if (isValid) {
      setJsonData(parsedOrError);
    } else {
      setError(parsedOrError); // In case the initial JSON is invalid
    }
  }, []);

  const handleJSONChange = (value: string) => {
    setJsonInput(value);
    const [isValid, parsedOrError] = validateJSON(value);

    if (isValid) {
      setError('');
      setJsonData(parsedOrError);
    } else {
      setError(parsedOrError);
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <Box sx={{ width: '30vw' }}>
        <JSONEditor value={jsonInput} onChange={handleJSONChange} />
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </Box>
      <div style={{ width: '70vw', height: '100vw' }}>
        <FlowViewer jsonData={jsonData} />
      </div>
    </div>
  );
};

export default JSONViewerScreen;
