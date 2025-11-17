import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, AlertTriangle } from 'lucide-react';
import defaultUniversities, { University } from '../../data/universities';

interface UniversityGridProps {
  universities?: University[];
}

const UniversityGrid: React.FC<UniversityGridProps> = ({ universities = defaultUniversities }) => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '32px'
    }}>
      {universities.length === 0 ? (
        <div style={{
          gridColumn: '1 / -1',
          textAlign: 'center',
          padding: '64px 0',
          color: 'white'
        }}>
          <p style={{fontSize: '1.125rem'}}>
            No universities found matching your search. Try a different term.
          </p>
        </div>
      ) : (
        universities.map((university) => (
          <div 
            key={university.id}
            className="glassmorphic-card"
            style={{
              position: 'relative',
              borderRadius: '16px',
              overflow: 'hidden',
              height: '288px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
              border: '1px solid rgba(123, 213, 245, 0.2)',
              transition: 'all 0.3s ease',
            }}
          >
            {/* Image with gradient overlay */}
            <div style={{
              position: 'absolute', 
              inset: 0, 
              background: 'linear-gradient(to top, rgba(7, 15, 40, 0.95), rgba(7, 15, 40, 0.3))', 
              zIndex: 2,
            }} />
            <img 
              src={university.logo} 
              alt={university.name}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.5s ease, filter 0.5s ease',
                zIndex: 1,
                filter: 'brightness(0.9) saturate(1.1)'
              }}
            />
            
            {/* Content */}
            <div style={{
              position: 'absolute',
              inset: 0,
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              zIndex: 3
            }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: 'white',
                marginBottom: '12px',
                textShadow: '0 2px 6px rgba(0, 0, 0, 0.5)',
                transition: 'transform 0.3s ease'
              }}>{university.shortName}</h3>
              
              <p style={{
                color: '#7eeaff',
                fontSize: '1rem',
                marginBottom: '24px',
                textShadow: '0 2px 6px rgba(0, 0, 0, 0.5)',
                transition: 'transform 0.3s ease, opacity 0.3s ease'
              }}>{university.name}</p>
              {/* Display merit formula for each program if available */}
              {university.programs && university.programs.length > 0 && (
                <div style={{ marginBottom: '16px' }}>
                  {university.programs.map((program) => (
                    program.formula ? (
                      <div key={program.id} style={{ color: '#b6eaff', fontSize: '0.95rem', marginBottom: 4 }}>
                        <span style={{ fontWeight: 600 }}>{program.name}:</span> 
                        <span>
                          {program.formula.matriculation !== undefined && `SSC: ${(program.formula.matriculation * 100).toFixed(0)}%`}
                          {program.formula.intermediate !== undefined && `, HSSC: ${(program.formula.intermediate * 100).toFixed(0)}%`}
                          {program.formula.entryTest !== undefined && `, Entry Test: ${(program.formula.entryTest * 100).toFixed(0)}%`}
                        </span>
                      </div>
                    ) : null
                  ))}
                </div>
              )}
              
              {university.isImplemented ? (
                <Link 
                  to={`/calculator/${university.id}`}
                  className="calculate-btn"
                  style={{
                    padding: '10px 20px',
                    backgroundColor: 'rgba(0, 180, 255, 0.9)',
                    color: 'white',
                    borderRadius: '8px',
                    fontWeight: 600,
                    display: 'inline-flex',
                    alignItems: 'center',
                    fontSize: '0.875rem',
                    justifyContent: 'center',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    zIndex: 12,
                    overflow: 'hidden'
                  }}
                >
                  Calculate Now
                </Link>
              ) : (
                <div style={{display: 'flex', flexDirection: 'column', gap: '8px', position: 'relative', zIndex: 12}}>
                  <span style={{
                    padding: '10px 20px',
                    backgroundColor: 'rgba(18, 19, 48, 0.8)',
                    color: '#aeaed9',
                    borderRadius: '8px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    fontSize: '0.875rem',
                    justifyContent: 'center',
                    boxShadow: '0 3px 8px rgba(0, 0, 0, 0.15)',
                    border: '1px solid rgba(123, 213, 245, 0.1)',
                    transition: 'all 0.3s ease'
                  }}>
                    <AlertTriangle style={{width: '16px', height: '16px', marginRight: '8px', color: '#dfbe4f'}} />
                    Coming Soon
                  </span>
                </div>
              )}
              
              <a 
                href={university.website} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  padding: '10px',
                  backgroundColor: 'rgba(18, 19, 48, 0.8)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  zIndex: 12
                }}
              >
                <ExternalLink style={{width: '16px', height: '16px', color: 'white'}} />
              </a>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default UniversityGrid;