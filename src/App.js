import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes, createGlobalStyle, ThemeProvider } from 'styled-components';

// Add theme definitions
const lightTheme = {
  background: '#FFF8E1',
  text: '#3B3A30',
  primary: '#DC143C',
  secondary: '#008080',
  accent: '#FFC107',
  cardBackground: '#FFF8E1',
  cardBorder: '#008080',
};

const darkTheme = {
  background: '#1E1E1E',
  text: '#E0E0E0',
  primary: '#FF6B6B',
  secondary: '#4ECDC4',
  accent: '#FFD93D',
  cardBackground: '#2C2C2C',
  cardBorder: '#4ECDC4',
};

// Update GlobalStyle
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,700;1,400&display=swap');

  body {
    margin: 0;
    padding: 0;
    font-family: 'Cormorant Garamond', serif;
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.text};
  }
`;

// Update keyframe animations
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const flicker = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const typewriter = keyframes`
  from { width: 0; }
  to { width: 100%; }
`;

// Add new keyframe animations
const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-30px); }
  60% { transform: translateY(-15px); }
`;

// Update styled components
const Page = styled.div`
  background-image: url('/images/drinks.jpg');
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  min-height: 100vh;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${props => props.theme.background}CC;
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  padding: 40px;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 60px;
  animation: ${fadeIn} 1.5s ease-out;
`;

const Title = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 72px;
  color: ${props => props.theme.primary};
  text-shadow: 3px 3px ${props => props.theme.accent}, 6px 6px ${props => props.theme.primary};
  margin-bottom: 10px;
  letter-spacing: 2px;
  animation: ${flicker} 5s infinite;
  position: relative;
  
  &::after {
    content: 'Est. 1985';
    position: absolute;
    bottom: -20px;
    right: 0;
    font-size: 18px;
    font-style: italic;
    color: ${props => props.theme.secondary};
  }
`;

const Subtitle = styled.h2`
  font-size: 24px;
  color: ${props => props.theme.secondary};
  font-weight: 400;
  font-style: italic;
  position: relative;
  display: inline-block;
  
  &::before, &::after {
    content: '✦';
    color: ${props => props.theme.primary};
    margin: 0 10px;
  }
`;

const MainContent = styled.main`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
`;

const AdCard = styled.div`
  background-color: ${props => props.theme.cardBackground};
  background-image: linear-gradient(45deg, ${props => props.theme.cardBackground} 25%, ${props => props.theme.accent}22 25%, ${props => props.theme.accent}22 50%, ${props => props.theme.cardBackground} 50%, ${props => props.theme.cardBackground} 75%, ${props => props.theme.accent}22 75%, ${props => props.theme.accent}22 100%);
  background-size: 40px 40px;
  border: 2px solid ${props => props.theme.cardBorder};
  border-radius: 10px;
  padding: 30px;
  width: 300px;
  text-align: center;
  box-shadow: 5px 5px 0px ${props => props.theme.accent};
  transition: all 0.5s ease;
  animation: ${slideIn} 0.5s ease-out;
  position: relative;

  &:hover {
    transform: translateY(-10px) rotate(2deg);
    box-shadow: 12px 12px 0px ${props => props.theme.accent};
  }

  &::after {
    content: '';
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    bottom: 10px;
    border: 1px dashed ${props => props.theme.cardBorder};
    pointer-events: none;
  }
`;

const AdImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  margin-bottom: 20px;
  border: 1px solid ${props => props.theme.text};
  filter: ${props => props.theme === darkTheme ? 'brightness(0.8) contrast(1.2)' : 'sepia(30%)'};
`;

const AdTitle = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 28px;
  color: ${props => props.theme.primary};
  margin-bottom: 15px;
  text-transform: uppercase;
`;

const AdDescription = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: ${props => props.theme.text};
`;

const Button = styled.button`
  background-color: ${props => props.theme.secondary};
  color: ${props => props.theme.background};
  border: none;
  padding: 12px 24px;
  font-size: 18px;
  font-family: 'Cormorant Garamond', serif;
  cursor: pointer;
  margin-top: 20px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      120deg,
      transparent,
      rgba(255, 248, 225, 0.3),
      transparent
    );
    transition: all 0.5s;
  }

  &:hover:before {
    left: 100%;
  }

  &:hover {
    background-color: ${props => props.theme.primary};
  }
`;

const Footer = styled.footer`
  text-align: center;
  margin-top: 60px;
  font-size: 14px;
  color: ${props => props.theme.text};
  font-style: italic;
`;

const RotatingLogo = styled.img`
  width: 50px;
  height: 50px;
  animation: ${rotate} 10s linear infinite;
  filter: sepia(50%);
`;

const FeaturedSection = styled.section`
  background-color: ${props => props.theme.accent}90;
  padding: 60px 0;
  margin: 60px 0;
  text-align: center;
`;

const FeaturedTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 48px;
  color: ${props => props.theme.primary};
  margin-bottom: 30px;
`;

const Carousel = styled.div`
  display: flex;
  overflow-x: auto;
  padding: 20px 0;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const CarouselItem = styled.div`
  flex: 0 0 auto;
  width: 250px;
  margin: 0 20px;
`;

const CarouselImage = styled(AdImage)`
  height: 150px;
`;

const TestimonialSection = styled.section`
  background-color: ${props => props.theme.background};
  padding: 80px 0;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle, ${props => props.theme.accent}22 10%, transparent 10%),
                radial-gradient(circle, ${props => props.theme.accent}22 10%, transparent 10%);
    background-size: 30px 30px;
    background-position: 0 0, 15px 15px;
    opacity: 0.1;
  }
`;

const TestimonialTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 48px;
  color: ${props => props.theme.primary};
  margin-bottom: 50px;
  position: relative;
  display: inline-block;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background-color: ${props => props.theme.secondary};
  }
`;

const TestimonialCarousel = styled.div`
  display: flex;
  overflow: hidden;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

const TestimonialSlide = styled.div`
  flex: 0 0 100%;
  opacity: ${props => props.active ? 1 : 0};
  transition: opacity 0.5s ease-in-out;
`;

const Testimonial = styled.blockquote`
  font-style: italic;
  font-size: 24px;
  color: ${props => props.theme.text};
  margin: 0 auto 20px;
  padding: 0 20px;
  position: relative;

  &::before, &::after {
    content: '"';
    font-size: 72px;
    color: ${props => props.theme.primary};
    opacity: 0.2;
    position: absolute;
  }

  &::before {
    top: -20px;
    left: -10px;
  }

  &::after {
    bottom: -50px;
    right: -10px;
  }
`;

const Author = styled.cite`
  font-style: normal;
  font-weight: bold;
  color: ${props => props.theme.secondary};
  display: block;
  margin-top: 20px;
`;

const TestimonialDots = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const Dot = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.active ? props.theme.primary : props.theme.accent};
  margin: 0 5px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.primary};
  }
`;

const NewsletterSection = styled.section`
  background-color: ${props => props.theme.primary};
  color: ${props => props.theme.background};
  padding: 100px 0;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    right: -50%;
    bottom: -50%;
    background: radial-gradient(circle, ${props => props.theme.accent}33 0%, transparent 70%);
    animation: ${rotate} 30s linear infinite;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: repeating-linear-gradient(
      45deg,
      ${props => props.theme.primary},
      ${props => props.theme.primary} 10px,
      ${props => props.theme.secondary}22 10px,
      ${props => props.theme.secondary}22 20px
    );
    opacity: 0.1;
  }
`;

const NewsletterTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 56px;
  margin-bottom: 30px;
  position: relative;
  z-index: 1;
  color: ${props => props.theme.background};
  text-shadow: 2px 2px ${props => props.theme.accent};
`;

const NewsletterForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: stretch;
  margin-top: 40px;
  position: relative;
  z-index: 1;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const NewsletterInput = styled.input`
  flex-grow: 1;
  padding: 15px 20px;
  font-size: 18px;
  border: none;
  border-radius: 30px 0 0 30px;
  color: ${props => props.theme.text};
  background-color: ${props => props.theme.background};
  outline: none;
  transition: all 0.3s ease;
  box-shadow: inset 0 0 0 2px ${props => props.theme.accent};

  &:focus {
    box-shadow: inset 0 0 0 2px ${props => props.theme.secondary};
  }
`;

const NewsletterButton = styled(Button)`
  background-color: ${props => props.theme.accent};
  border-radius: 0 30px 30px 0;
  padding: 15px 30px;
  font-size: 18px;
  transition: all 0.3s ease;
  white-space: nowrap;
  color: ${props => props.theme.background};
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 1px;

  &:hover {
    background-color: ${props => props.theme.secondary};
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const TypewriterText = styled.div`
  overflow: hidden;
  white-space: nowrap;
  margin: 0 auto;
  letter-spacing: 0.15em;
  animation: ${typewriter} 3.5s steps(40, end), ${flicker} 0.5s step-end infinite alternate;
  max-width: 800px;
  font-size: 24px;
  color: ${props => props.theme.background};
  text-shadow: 1px 1px ${props => props.theme.accent};
  margin-bottom: 30px;
`;

const NewsletterIcon = styled.i`
  font-size: 48px;
  color: ${props => props.theme.background};
  margin-bottom: 20px;
  animation: ${bounce} 2s infinite;
`;

// Add new styled components
const RetroSection = styled.section`
  background-color: ${props => props.theme.primary};
  color: ${props => props.theme.background};
  padding: 80px 0;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: repeating-linear-gradient(
      45deg,
      ${props => props.theme.primary},
      ${props => props.theme.primary} 10px,
      ${props => props.theme.secondary}88 10px,
      ${props => props.theme.secondary}88 20px
    );
    opacity: 0.1;
  }
`;

const RetroTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 64px;
  margin-bottom: 30px;
  text-shadow: 3px 3px ${props => props.theme.accent};
  position: relative;
  z-index: 1;
`;

const RetroText = styled.p`
  font-size: 24px;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
  position: relative;
  z-index: 1;
`;

const ShimmerButton = styled(Button)`
  background: linear-gradient(to right, ${props => props.theme.secondary} 0%, ${props => props.theme.accent} 10%, ${props => props.theme.secondary} 20%);
  background-size: 200% 100%;
  animation: ${shimmer} 3s infinite;
  border: 2px solid ${props => props.theme.background};
  font-weight: bold;
  letter-spacing: 2px;
`;

const BouncingIcon = styled.i`
  font-size: 48px;
  color: ${props => props.theme.accent};
  animation: ${bounce} 2s infinite;
  display: block;
  margin-top: 30px;
`;

// Add useTheme hook
const useTheme = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => setTheme(mediaQuery.matches ? 'dark' : 'light');
    
    mediaQuery.addListener(handleChange);
    handleChange();

    return () => mediaQuery.removeListener(handleChange);
  }, []);

  return theme === 'light' ? lightTheme : darkTheme;
};

const LandingPage = () => {
  const [email, setEmail] = useState('');
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const testimonialRef = useRef(null);

  const testimonials = [
    {
      text: "Creative Minds Agency has transformed our brand presence online. Their innovative approach and dedication to excellence are unmatched!",
      author: "Jane Smith, CEO of Tech Innovators"
    },
    {
      text: "The retro-inspired designs they created for our campaign were a huge hit. It's rare to find an agency that can blend nostalgia with modern trends so seamlessly.",
      author: "John Doe, Marketing Director at Vintage Vibes"
    },
    {
      text: "Their attention to detail and creative problem-solving skills have consistently exceeded our expectations. A true partner in our success!",
      author: "Emily Johnson, Founder of EcoStyle"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for subscribing with email: ${email}`);
    setEmail('');
  };

  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Page>
        <Content>
          <Header>
            <Title>Creative Minds Agency</Title>
            <Subtitle>Innovative Solutions for Your Brand</Subtitle>
          </Header>

          <MainContent>
            <AdCard>
              <AdImage src="/images/cosmo.jpg" alt="Brand Strategy" />
              <AdTitle>Brand Strategy</AdTitle>
              <AdDescription>
                Elevate your brand with our comprehensive strategy services, tailored to your unique vision.
              </AdDescription>
              <Button>Discover More</Button>
            </AdCard>

            <AdCard>
              <AdImage src="/images/bohemia.jpg" alt="Digital Marketing" />
              <AdTitle>Digital Marketing</AdTitle>
              <AdDescription>
                Reach your audience with precision through our cutting-edge digital marketing solutions.
              </AdDescription>
              <Button>Get Started</Button>
            </AdCard>

            <AdCard>
              <AdImage src="/images/photo.jpg" alt="Creative Design" />
              <AdTitle>Creative Design</AdTitle>
              <AdDescription>
                Transform your ideas into stunning visuals with our expert design team.
              </AdDescription>
              <Button>See Our Work</Button>
            </AdCard>
          </MainContent>
          <br></br>
          <br></br>
          <RetroSection>
            <RetroTitle>Timeless Creativity</RetroTitle>
            <RetroText>
              Since 1985, we've been blending classic design principles with cutting-edge techniques. Our retro-inspired approach brings a unique flair to modern branding.
            </RetroText>
            <ShimmerButton>Explore Our Legacy</ShimmerButton>
            <BouncingIcon className="fas fa-chevron-down" />
          </RetroSection>

          <FeaturedSection>
            <FeaturedTitle>Our Expertise</FeaturedTitle>
            <Carousel>
              <CarouselItem>
                <CarouselImage src="/images/coke.jpg" alt="Social Media Management" />
                <AdTitle>Social Media Management</AdTitle>
                <Button>Learn More</Button>
              </CarouselItem>
              <CarouselItem>
                <CarouselImage src="/images/shoes.jpg" alt="Content Creation" />
                <AdTitle>Content Creation</AdTitle>
                <Button>Explore Services</Button>
              </CarouselItem>
              <CarouselItem>
                <CarouselImage src="/images/paris.jpg" alt="Analytics & Insights" />
                <AdTitle>Analytics & Insights</AdTitle>
                <Button>View Details</Button>
              </CarouselItem>
              {/* Add more CarouselItems as needed */}
            </Carousel>
          </FeaturedSection>

          <TestimonialSection>
            <TestimonialTitle>Client Testimonials</TestimonialTitle>
            <TestimonialCarousel ref={testimonialRef}>
              {testimonials.map((testimonial, index) => (
                <TestimonialSlide
                  key={index}
                  active={index === activeTestimonial}
                  style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
                >
                  <Testimonial>
                    {testimonial.text}
                    <Author>- {testimonial.author}</Author>
                  </Testimonial>
                </TestimonialSlide>
              ))}
            </TestimonialCarousel>
            <TestimonialDots>
              {testimonials.map((_, index) => (
                <Dot
                  key={index}
                  active={index === activeTestimonial}
                  onClick={() => setActiveTestimonial(index)}
                />
              ))}
            </TestimonialDots>
          </TestimonialSection>

          <NewsletterSection>
            <NewsletterIcon className="fas fa-envelope-open-text" />
            <NewsletterTitle>Stay Ahead of the Curve</NewsletterTitle>
            <TypewriterText>Subscribe for exclusive insights and trends!</TypewriterText>
            <NewsletterForm onSubmit={handleSubmit}>
              <NewsletterInput 
                type="email" 
                placeholder="Enter your email address" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
              <NewsletterButton type="submit">Join Now</NewsletterButton>
            </NewsletterForm>
          </NewsletterSection>

          <Footer>
            <p>© 2024 Creative Minds Agency. Crafting the future of advertising since 1985.</p>
            <RotatingLogo src="/images/logo.png" alt="Creative Minds Agency Logo" />
          </Footer>
        </Content>
      </Page>
    </ThemeProvider>
  );
};

export default LandingPage;