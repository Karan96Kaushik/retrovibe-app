import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes, createGlobalStyle } from 'styled-components';

// Add global styles
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,700;1,400&display=swap');

  body {
    margin: 0;
    padding: 0;
    font-family: 'Cormorant Garamond', serif;
    background-color: #FFF8E1;
    color: #3B3A30;
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
    background-color: rgba(255, 248, 225, 0.7);
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
  color: #DC143C;
  text-shadow: 3px 3px #FFC107, 6px 6px #DC143C;
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
    color: #008080;
  }
`;

const Subtitle = styled.h2`
  font-size: 24px;
  color: #008080;
  font-weight: 400;
  font-style: italic;
  position: relative;
  display: inline-block;
  
  &::before, &::after {
    content: '✦';
    color: #DC143C;
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
  background-color: #FFF8E1;
  background-image: linear-gradient(45deg, #FFF8E1 25%, #FFEFD5 25%, #FFEFD5 50%, #FFF8E1 50%, #FFF8E1 75%, #FFEFD5 75%, #FFEFD5 100%);
  background-size: 40px 40px;
  border: 2px solid #008080;
  border-radius: 10px;
  padding: 30px;
  width: 300px;
  text-align: center;
  box-shadow: 5px 5px 0px #FFC107;
  transition: all 0.5s ease;
  animation: ${slideIn} 0.5s ease-out;
  position: relative;

  &:hover {
    transform: translateY(-10px) rotate(2deg);
    box-shadow: 12px 12px 0px #FFC107;
  }

  &::after {
    content: '';
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    bottom: 10px;
    border: 1px dashed #008080;
    pointer-events: none;
  }
`;

const AdImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  margin-bottom: 20px;
  border: 1px solid #3B3A30;
  filter: sepia(30%);
`;

const AdTitle = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 28px;
  color: #DC143C;
  margin-bottom: 15px;
  text-transform: uppercase;
`;

const AdDescription = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #3B3A30;
`;

const Button = styled.button`
  background-color: #008080;
  color: #FFF8E1;
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
    background-color: #006666;
  }
`;

const Footer = styled.footer`
  text-align: center;
  margin-top: 60px;
  font-size: 14px;
  color: #3B3A30;
  font-style: italic;
`;

const RotatingLogo = styled.img`
  width: 50px;
  height: 50px;
  animation: ${rotate} 10s linear infinite;
  filter: sepia(50%);
`;

const FeaturedSection = styled.section`
  background-color: #FFC107;
  padding: 60px 0;
  margin: 60px 0;
  text-align: center;
`;

const FeaturedTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 48px;
  color: #DC143C;
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
  background-color: #FFF8E1;
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
    background: radial-gradient(circle, #FFC107 10%, transparent 10%),
                radial-gradient(circle, #FFC107 10%, transparent 10%);
    background-size: 30px 30px;
    background-position: 0 0, 15px 15px;
    opacity: 0.1;
  }
`;

const TestimonialTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 48px;
  color: #DC143C;
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
    background-color: #008080;
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
  color: #3B3A30;
  margin: 0 auto 20px;
  padding: 0 20px;
  position: relative;

  &::before, &::after {
    content: '"';
    font-size: 72px;
    color: #DC143C;
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
  color: #008080;
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
  background-color: ${props => props.active ? '#DC143C' : '#FFC107'};
  margin: 0 5px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #DC143C;
  }
`;

const NewsletterSection = styled.section`
  background-color: #008080;
  color: #FFF8E1;
  padding: 80px 0;
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
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%);
    animation: ${rotate} 20s linear infinite;
  }
`;

const NewsletterTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 48px;
  margin-bottom: 30px;
  position: relative;
  z-index: 1;
`;

const NewsletterForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: stretch;
  margin-top: 40px;
  position: relative;
  z-index: 1;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
`;

const NewsletterInput = styled.input`
  flex-grow: 1;
  padding: 12px 15px;
  font-size: 18px;
  border: none;
  border-radius: 25px 0 0 25px;
  color: #3B3A30;
  outline: none;
  transition: box-shadow 0.3s ease;

  &:focus {
    box-shadow: 0 0 0 2px #FFC107;
  }
`;

const NewsletterButton = styled(Button)`
  background-color: #DC143C;
  border-radius: 0 25px 25px 0;
  padding: 12px 30px;
  font-size: 18px;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    background-color: #B01030;
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
  color: #FFC107;
`;

// Add new styled components
const RetroSection = styled.section`
  background-color: #DC143C;
  color: #FFF8E1;
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
      #DC143C,
      #DC143C 10px,
      #B01030 10px,
      #B01030 20px
    );
    opacity: 0.1;
  }
`;

const RetroTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 64px;
  margin-bottom: 30px;
  text-shadow: 3px 3px #FFC107;
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
  background: linear-gradient(to right, #008080 0%, #00CED1 10%, #008080 20%);
  background-size: 200% 100%;
  animation: ${shimmer} 3s infinite;
  border: 2px solid #FFF8E1;
  font-weight: bold;
  letter-spacing: 2px;
`;

const BouncingIcon = styled.i`
  font-size: 48px;
  color: #FFC107;
  animation: ${bounce} 2s infinite;
  display: block;
  margin-top: 30px;
`;

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

  return (
    <>
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
            <NewsletterTitle>Stay Updated with Industry Trends</NewsletterTitle>
            <TypewriterText>Subscribe to our newsletter for insights and updates!</TypewriterText>
            <NewsletterForm onSubmit={handleSubmit}>
              <NewsletterInput 
                type="email" 
                placeholder="Enter your email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
              <NewsletterButton type="submit">Subscribe</NewsletterButton>
            </NewsletterForm>
          </NewsletterSection>

          <Footer>
            <p>© 2024 Creative Minds Agency. Crafting the future of advertising since 1985.</p>
            <RotatingLogo src="/images/logo.png" alt="Creative Minds Agency Logo" />
          </Footer>
        </Content>
      </Page>
    </>
  );
};

export default LandingPage;