import React, { useState } from 'react';
import { Container, Navbar, Nav, Button, Card, Row, Col, Form } from 'react-bootstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Style de base par défaut
import { servicesData, ServiceItem } from './data/services';
import logoImg from './assets/logo.png';
import logoDarkImg from './assets/logo2.png';

type Persona = 'abdramane' | 'fahima';
type Step = 'catalog' | 'details' | 'form' | 'success';

const App: React.FC = () => {
  const [persona, setPersona] = useState<Persona>('abdramane');
  const [step, setStep] = useState<Step>('catalog');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  
  // États pour la recherche et les filtres
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');

  // États pour les effets de survol (Hover)
  const [hoverRetour, setHoverRetour] = useState(false);
  const [hoverConfirmer, setHoverConfirmer] = useState(false);

  const isDark = persona === 'fahima';
  const s = servicesData[persona];

  const logoActuel = isDark ? logoDarkImg : logoImg;

  const [date, setDate] = useState<Date | null>(new Date());

  // Forcer la catégorie par défaut à correspondre à la langue lors du switch
  const currentAllCategory = isDark ? 'All' : 'Tous';
  const activeCategory = selectedCategory === 'Tous' && isDark ? 'All' : selectedCategory;

  // Filtrage dynamique des services selon la recherche et la catégorie
  const filteredServices = s.services.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === currentAllCategory || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Ta palette Figma officielle
  const colors = {
    terracotta: '#F2845C',
    darkTerracotta: '#BF6E50',
    beigeBg: '#F5F2EB',
    darkBg: '#261A1B', // Marron très foncé
    white: '#FFFFFF',
    textDark: '#261A1B'
  };

  const appStyle: React.CSSProperties = {
    backgroundColor: isDark ? '#1A1A24' : colors.beigeBg,
    color: isDark ? colors.white : colors.textDark,
    minHeight: '100vh',
    fontFamily: isDark ? "'Inter', sans-serif" : "'Inder', serif",
    transition: 'all 0.3s ease'
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: isDark ? '#262633' : colors.white,
    color: isDark ? colors.white : colors.textDark,
    border: 'none',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
  };

  return (
    <div style={appStyle}>
      {/* MODE CONFIGURATION EVALUATION */}
      <div className="bg-dark text-white p-2 text-center d-flex justify-content-center align-items-center gap-3 small">
        <span className="text-warning fw-bold">Personas :</span>
        <Button size="sm" variant={persona === 'abdramane' ? 'light' : 'outline-light'} onClick={() => { setPersona('abdramane'); setStep('catalog'); setSelectedCategory('Tous'); setSearchQuery(''); }}>
          Abdramane (Clair / FR)
        </Button>
        <Button size="sm" variant={persona === 'fahima' ? 'light' : 'outline-light'} onClick={() => { setPersona('fahima'); setStep('catalog'); setSelectedCategory('All'); setSearchQuery(''); }}>
          Fahima (Sombre / EN)
        </Button>
      </div>

      {/* NAVBAR AVEC LOGO FIGMA */}
      <Navbar expand="lg" variant={isDark ? 'dark' : 'light'} className="py-3">
        <Container>

          <Navbar.Brand href="#" className="d-flex align-items-center ms-5">
            <img 
              src={logoActuel} // Utilise le logo dynamique
              alt="Docteur Cheveux Logo" 
              height="55" // Agrandissement du logo
              className="d-inline-block align-top"
              style={{ transition: 'all 0.3s ease' }} // Transition fluide au changement de mode
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto align-items-center gap-3 fw-bold">
              <Nav.Link href="#" active>{isDark ? 'HOME' : 'ACCUEIL'}</Nav.Link>
              <Nav.Link href="#">SERVICES</Nav.Link>
              <Nav.Link href="#">{isDark ? 'PRODUCTS' : 'PRODUITS'}</Nav.Link>
              <Nav.Link href="#">CONTACTS</Nav.Link>
              <Button variant={isDark ? 'outline-light' : 'outline-dark'} size="sm" className="fw-bold px-3">
                {isDark ? 'EN' : 'FR'}
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* ZONE PRINCIPALE */}
      <Container className="py-4">
        
        {/* ÉTAPE 1 : CATALOGUE + BARRE DE RECHERCHE + FILTRES */}
        {step === 'catalog' && (
          <Row className="justify-content-center">
            <Col lg={9}>
              {isDark && <h2 className="mb-4 fw-bold">{s.subtitle}</h2>}
              
              {/* BARRE DE RECHERCHE FIGMA */}
              <div className="mb-4">
                <Form.Control 
                  type="text"
                  placeholder={s.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="p-3 shadow-sm"
                  style={{
                    borderRadius: '30px',
                    border: '1px solid #CCC',
                    backgroundColor: isDark ? '#262633' : '#FFF',
                    color: isDark ? '#FFF' : '#000'
                  }}
                />
              </div>

              {/* BARRE DE DÉFILEMENT / CHIPS DES CATÉGORIES */}
              <div 
                className="d-flex gap-2 mb-4 pb-2" 
                style={{ 
                  overflowX: 'auto', 
                  whiteSpace: 'nowrap',
                  scrollbarWidth: 'thin'
                }}
              >
                {s.categories.map((cat) => (
                  <Button
                    key={cat}
                    variant={activeCategory === cat ? 'dark' : 'outline-secondary'}
                    className="px-4 rounded-pill fw-bold"
                    onClick={() => setSelectedCategory(cat)}
                    style={activeCategory === cat ? { backgroundColor: colors.terracotta, borderColor: colors.terracotta, color: '#fff' } : {}}
                  >
                    {cat}
                  </Button>
                ))}
              </div>

              {/* BOUCLE D'AFFICHAGE MULTIPLE DES SERVICES */}
              <Row className="g-4">
                {filteredServices.map((item) => (
                  <Col xs={12} key={item.id}>
                    <Card style={cardStyle} className="p-4 border-0">
                      <Row className="align-items-center g-4">
                        {/* 🛠️ REMPLACE CE COLONNE DANS TA BOUCLE DE CARTES : */}
                        <Col md={4} className="text-center">
                          <div 
                            className="d-flex align-items-center justify-content-center rounded overflow-hidden"
                            style={{ 
                              height: '160px', 
                              backgroundColor: isDark ? '#1A1A24' : '#E8E2D5',
                            }}
                          >
                            {item.image ? (
                              <img 
                                src={item.image} 
                                alt={item.title} 
                                style={{ 
                                  width: '100%', 
                                  height: '100%', 
                                  objectFit: 'cover' // Permet de remplir proprement la boîte sans déformer l'image
                                }} 
                              />
                            ) : (
                              <span className="opacity-50 small">📸 [Image: {item.title}]</span>
                            )}
                          </div>
                        </Col>
                        <Col md={8}>
                          <h3 className="fw-bold">{item.title}</h3>
                          <p className="my-2 opacity-75 small">{item.description}</p>
                          <div className="fw-bold mb-3">
                            <span style={{ color: colors.darkTerracotta }}>{item.price}</span> &bull; <span className="text-muted small">{item.duration}</span>
                          </div>
                          <Button 
                            style={{ backgroundColor: colors.terracotta, borderColor: colors.terracotta }}
                            className="fw-bold"
                            onClick={() => { setSelectedService(item); setStep('details'); }}
                          >
                            {s.btnDetails}
                          </Button>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                ))}
                
                {filteredServices.length === 0 && (
                  <div className="text-center py-5 opacity-50">Aucun service ne correspond à vos critères.</div>
                )}
              </Row>
            </Col>
          </Row>
        )}

        {/* ÉTAPE 2 : VUE DÉTAILLÉE DU SERVICE SÉLECTIONNÉ */}
        {step === 'details' && selectedService && (
  <Row className="justify-content-center">
    <Col lg={10}>
      <Card 
        style={{
          backgroundColor: isDark ? '#262633' : '#D9C7B8', // Fond beige plus foncé comme sur Figma
          color: isDark ? colors.white : colors.textDark,
          border: 'none',
          borderRadius: '24px',
          padding: '2.5rem'
        }}
      >
        <Row className="g-5 align-items-start">
          
          {/* COLONNE GAUCHE : IMAGE + BOUTONS ACTION */}
          <Col md={5} className="d-flex flex-column gap-3">
            <div 
              className="rounded-4 overflow-hidden shadow-sm"
              style={{ 
                height: '280px', 
                backgroundColor: isDark ? '#1A1A24' : '#E8E2D5' 
              }}
            >
              {selectedService.image ? (
                <img 
                  src={selectedService.image} 
                  alt={selectedService.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              ) : (
                <div className="d-flex h-100 align-items-center justify-content-center opacity-50">
                  📸 [Image: {selectedService.title}]
                </div>
              )}
            </div>

            {/* Bouton Réservation avec Icône */}
            <Button 
              style={{ 
                backgroundColor: '#BF6E50', // Marron/Terracotta Figma
                borderColor: '#BF6E50',
                borderRadius: '12px',
                padding: '14px'
              }} 
              className="fw-bold fs-5 text-dark d-flex align-items-center justify-content-center gap-3 w-100 border-0 shadow-sm"
              onClick={() => setStep('form')}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5H7v2h5v-2zm4 0h-2v2h2v-2zm-4 4H7v2h5v-2zm4 0h-2v2h2v-2z"/>
              </svg>
              {s.btnBook || 'Reservation'}
            </Button>

            {/* Bouton Retour */}
            <Button 
              style={{ 
                backgroundColor: '#1A1A1B', // Bouton noir Figma
                borderColor: '#1A1A1B',
                borderRadius: '12px',
                padding: '14px'
              }} 
              className="fw-bold fs-5 text-white w-100 border-0 shadow-sm"
              onClick={() => setStep('catalog')}
            >
              {s.btnBack || 'Retour'}
            </Button>
          </Col>

          {/* COLONNE DROITE : TITRE + DÉTAILS TEXTE + PRIX */}
          <Col md={7} className="d-flex flex-column h-100 justify-content-between">
            <div>
              <h1 className="fw-bold mb-4" style={{ fontSize: '2.5rem', fontFamily: "'Inder', sans-serif" }}>
                {selectedService.title}
              </h1>
              
              <h5 className="fw-bold mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
                {isDark ? 'Included in service:' : 'Inclus dans le service :'}
              </h5>
              <ul className="mb-4 ps-3" style={{ fontSize: '1.05rem', lineHeight: '1.6' }}>
                {selectedService.inclusions.map((inc, idx) => (
                  <li key={idx} className="mb-2 fw-semibold">{inc}</li>
                ))}
              </ul>

              <h5 className="fw-bold mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                {isDark ? 'Preparation tip:' : 'Conseil de préparation :'}
              </h5>
              <p className="fw-semibold mb-4" style={{ fontSize: '1.05rem', lineHeight: '1.5', opacity: 0.9 }}>
                {selectedService.preparation}
              </p>

              {isDark && selectedService.products && (
                <div className="p-3 rounded mb-4" style={{ backgroundColor: '#1A1A24', borderLeft: `4px solid ${colors.terracotta}` }}>
                  <h5 className="fw-bold mb-2 text-warning">Products used:</h5>
                  <p className="opacity-90 small mb-0">{selectedService.products}</p>
                </div>
              )}
            </div>

            {/* BLOC DURÉE ET PRIX TOUT EN BAS */}
            <div className="mt-auto pt-3 border-top border-dark border-opacity-10">
              <div className="fw-bold fs-4 mb-1">
                {isDark ? 'Haircut duration:' : 'Duree de la coiffure :'} {selectedService.duration.replace('h00', ' H').replace('1h00', '1 H')}
              </div>
              <div className="fw-bold" style={{ fontSize: '3.2rem', lineHeight: '1.1' }}>
                {selectedService.price}
              </div>
            </div>
          </Col>

        </Row>
      </Card>
    </Col>
  </Row>
)}

      
        {/* ÉTAPE 3 : FORMULAIRE ET CALENDRIER (VERSION FIGMA) */}
        {/* ÉTAPE 3 : FORMULAIRE ET CALENDRIER (VERSION FIGMA) */}
        {step === 'form' && (
          <Row className="justify-content-center">
            <Col lg={10}>
              <Card 
                style={{
                  // Utilise le gris de ta maquette Figma (#D1D1D1) même en mode sombre pour garantir le contraste avec le texte noir,
                  // ou un gris adapté si tu souhaites conserver le texte noir partout.
                  backgroundColor: isDark ? '#D1D1D1' : '#D1D1D1', 
                  color: '#000000', // Le texte reste noir et bien lisible sur le fond gris clair
                  border: 'none',
                  borderRadius: '24px',
                  padding: '2.5rem'
                }}
              >
                <Row className="g-5">
                  
                  {/* COLONNE GAUCHE : BOUTON RETOUR & CALENDRIER INTERACTIF */}
                  <Col md={5} className="d-flex flex-column gap-4">
                    <Button 
                      style={{ 
                        backgroundColor: hoverRetour ? '#2a2a2c' : '#1A1A1B',
                        borderColor: '#1A1A1B',
                        borderRadius: '14px',
                        padding: '12px 24px',
                        width: 'fit-content',
                        transition: 'background-color 0.2s ease'
                      }} 
                      className="fw-bold fs-5 text-white border-0 shadow-sm"
                      onMouseEnter={() => setHoverRetour(true)}
                      onMouseLeave={() => setHoverRetour(false)}
                      onClick={() => setStep('details')}
                    >
                      {s.btnBack || 'Retour'}
                    </Button>

                    <div className="text-center mt-2">
                      <h4 className="fw-bold mb-3 d-flex align-items-center justify-content-center gap-2">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"/>
                        </svg>
                        {isDark ? 'Choose a date' : 'Choisi une date'}
                      </h4>
                      
                      {/* VRAI CALENDRIER SÉLECTIONNABLE */}
                      <div className="bg-white p-3 rounded-4 shadow-sm text-dark mx-auto custom-calendar-wrapper" style={{ maxWidth: '340px' }}>
                        <Calendar 
                          onChange={(value) => setDate(value as Date)} 
                          value={date}
                          locale={isDark ? "en-US" : "fr-CA"}
                          minDate={new Date()}
                        />
                        
                        {date && (
                          <div className="mt-3 small fw-bold text-primary">
                            {isDark ? 'Selected date: ' : 'Date sélectionnée : '}
                            {date.toLocaleDateString(isDark ? 'en-US' : 'fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                          </div>
                        )}
                      </div>
                    </div>
                  </Col>

                  {/* COLONNE DROITE : FORMULAIRE ET INFOS SALON */}
                  <Col md={7}>
                    <h2 className="fw-bold mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {isDark ? 'Customer Information' : (s.formTitle || 'Infos du client')}
                    </h2>
                    
                    <Form onSubmit={(e) => { e.preventDefault(); setStep('success'); }}>
                      {/* Champ Nom */}
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold mb-1">{isDark ? 'Full Name' : (s.formName || 'Nom et prénoms')}</Form.Label>
                        <Form.Control 
                          type="text" 
                          required 
                          placeholder="John Doe" 
                          className="p-2 border-0 rounded-1" 
                        />
                      </Form.Group>
                      
                      {/* Champ Téléphone */}
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold mb-1">{isDark ? 'Phone Number' : (s.formPhone || 'Numéro de téléphone')}</Form.Label>
                        <Form.Control 
                          type="tel" 
                          required 
                          placeholder="+1 (000) 000-0000" 
                          className="p-2 border-0 rounded-1" 
                        />
                      </Form.Group>

                      {/* Champ Email */}
                      <Form.Group className="mb-4">
                        <Form.Label className="fw-bold mb-1">{isDark ? 'Email address' : 'Adresse mail'}</Form.Label>
                        <Form.Control 
                          type="email" 
                          required 
                          placeholder="exemple@domaine.com" 
                          className="p-2 border-0 rounded-1" 
                        />
                      </Form.Group>

                      {/* SÉLECTION DE L'HEURE */}
                      <div className="text-center mb-4">
                        <div className="fw-bold mb-2">
                          {isDark ? 'Choose a time between 10h00 and 20h30:' : 'Choisir une heure entre 10h00 et 20h30 :'}
                        </div>
                        <div className="d-flex justify-content-center align-items-center gap-2">
                          <Form.Select 
                            className="fw-bold border-0 text-center shadow-sm" 
                            style={{ width: '80px', height: '40px', borderRadius: '8px' }}
                            defaultValue="12"
                          >
                            {Array.from({ length: 11 }, (_, i) => i + 10).map((h) => (
                              <option key={h} value={h}>{h}</option>
                            ))}
                          </Form.Select>
                          <span className="fw-bold fs-5">H</span>

                          <Form.Select 
                            className="fw-bold border-0 text-center shadow-sm" 
                            style={{ width: '80px', height: '40px', borderRadius: '8px' }}
                            defaultValue="00"
                          >
                            {['00', '15', '30', '45'].map((m) => (
                              <option key={m} value={m}>{m}</option>
                            ))}
                          </Form.Select>
                          <span className="fw-bold fs-5">min</span>
                        </div>
                      </div>

                      {/* Localisation et contacts du salon */}
                      <div className="bg-white p-3 rounded-4 mb-4 shadow-sm text-dark" style={{ fontSize: '0.95rem' }}>
                        <h5 className="fw-bold text-center mb-3">{isDark ? 'Salon location and contacts' : 'Localisation et contacts du salon'}</h5>
                        <div className="px-2">
                          <div className="mb-2"><strong>{isDark ? 'Location:' : 'Lieu :'}</strong> 587 Bd Saint Jerome, Gatineau, QC</div>
                          <div className="mb-2"><strong>Contact :</strong> +1 (545) 789-7412</div>
                          <div><strong>{isDark ? 'Email:' : 'Mail :'}</strong> docteurcheveux@gmail.com</div>
                        </div>
                      </div>

                      {/* Bouton Confirmer */}
                      <Button 
                        type="submit" 
                        style={{ 
                          backgroundColor: hoverConfirmer ? '#2a2a2c' : '#1A1A1B',
                          borderColor: '#1A1A1B',
                          borderRadius: '16px',
                          padding: '16px'
                        }} 
                        className="fw-bold fs-4 text-white w-100 border-0 shadow-sm mt-2"
                        onMouseEnter={() => setHoverConfirmer(true)}
                        onMouseLeave={() => setHoverConfirmer(false)}
                      >
                        {isDark ? 'Confirm Booking' : (s.btnConfirm || 'Confirmer')}
                      </Button>
                    </Form>
                  </Col>

                </Row>
              </Card>
            </Col>
          </Row>
        )}

        {/* ÉTAPE 4 : CONFIRMATION DE SUCCÈS */}
        {/* ÉTAPE : SUCCÈS / CONFIRMATION (image_77f9a3.png) */}
        {step === 'success' && (
          <div className="text-center py-5 my-5 text-white animate__animated animate__fadeIn">
            {/* Icône de coche orange stylisée comme sur la maquette */}
            <div className="mb-4">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#F2845C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>

            {/* Titre dynamique sans nom en dur */}
            <h1 className="fw-bold mb-3 display-4" style={{ fontFamily: "'Inter', sans-serif" }}>
              {isDark ? 'Thank you!' : 'Merci !'}
            </h1>

            {/* Message de confirmation */}
            <p className="fs-5 text-secondary mx-auto" style={{ maxWidth: '600px', color: '#a0a0a9' }}>
              {isDark 
                ? 'Your appointment is successfully booked. Check your email for confirmation.' 
                : 'Votre rendez-vous a été réservé avec succès. Vérifiez vos courriels pour la confirmation.'
              }
            </p>

            {/* Bouton de retour au catalogue */}
            <Button 
              style={{ 
                backgroundColor: '#F2845C', 
                borderColor: '#F2845C',
                borderRadius: '12px',
                padding: '12px 30px'
              }} 
              className="fw-bold fs-5 text-white mt-4 shadow"
              onClick={() => setStep('catalog')} // Remplace 'catalog' par ton étape initiale si nécessaire
            >
              {isDark ? 'Back to Catalog' : 'Retour au catalogue'}
            </Button>
          </div>
        )}

      </Container>

      {/* FOOTER */}
      <footer className="text-center py-4 mt-5 small opacity-50 border-top border-secondary border-opacity-10">
        Designed by KELYAN TAHE 
      </footer>
    </div>
  );
};

export default App;