import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Container,
  Grid,
  Card,
  CardContent,
  Box,
  Link as MuiLink,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Add this import

// Dummy data for features and testimonials
const features = [
  {
    title: "Organize Tasks",
    desc: "Create, assign, and prioritize tasks easily. Keep your team on the same page, always.",
  },
  {
    title: "Real-Time Collaboration",
    desc: "Chat, share files, and leave comments. Work together seamlessly, wherever you are.",
  },
  {
    title: "Track Progress",
    desc: "Visual dashboards, deadlines, and reports help you keep projects on track and under control.",
  },
  {
    title: "Custom Workflows",
    desc: "Build workflows that suit your team’s unique process. Automate repetitive tasks and save time.",
  },
  {
    title: "Third-Party Integrations",
    desc: "Seamlessly connect with Slack, Google Drive, GitHub, and more to boost productivity.",
  },
  {
    title: "Secure & Reliable",
    desc: "Enterprise-level security and 24/7 support gives you peace of mind for your data.",
  },
];

const testimonials = [
  {
    name: "Sarah, Product Manager",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "ProjectFlow transformed the way our team works. We’re more organized and productive than ever!",
    color: "from-pink-100 to-pink-300",
  },
  {
    name: "Mike, Team Lead",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "The integration and workflow automation features are amazing. Everything just works!",
    color: "from-green-100 to-green-300",
  },
  {
    name: "Priya, Developer",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    text: "I love the clean design and powerful dashboard. Highly recommended for any team.",
    color: "from-blue-100 to-blue-300",
  },
  {
    name: "Lucas, Designer",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    text: "Elegant, intuitive, and extremely reliable. ProjectFlow is the backbone of our workflow.",
    color: "from-yellow-100 to-yellow-300",
  },
];

// Animation variants
const cardVariants = {
  offscreen: { opacity: 0, y: 40 },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", bounce: 0.3, duration: 0.8 },
  },
};


const CARD_HEIGHT = 180; // px
const CARD_WIDTH = 550; // px, adjust as desired
const testimonialVariants = {
  offscreen: { opacity: 0, scale: 0.9 },
  onscreen: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, type: "spring", bounce: 0.2 },
  },
};

export default function LandingPage() {
  const navigate = useNavigate();
  const { user } = useAuth(); // Get user from auth context

  function handleButton() {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }

  return (
    <Box className="bg-gradient-to-br from-blue-100 to-blue-300 min-h-screen flex flex-col">
      {/* Navbar */}
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        className="!bg-transparent"
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="primary"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            className="flex-grow !text-blue-900 font-extrabold"
          >
            HH Project
          </Typography>
          <MuiLink
            href="#features"
            className="!mx-4 !text-blue-800 font-semibold !no-underline hover:!underline"
          >
            Features
          </MuiLink>
          <MuiLink
            href="#testimonials"
            className="!mx-4 !text-blue-800 font-semibold !no-underline hover:!underline"
          >
            Testimonials
          </MuiLink>
          <MuiLink
            href="#faq"
            className="!mx-4 !text-blue-800 font-semibold !no-underline hover:!underline"
          >
            FAQ
          </MuiLink>
          <Button
            variant="contained"
            color="primary"
            className="!rounded-full !ml-8 !bg-blue-700 !text-white !font-bold"
            onClick={handleButton}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box className="py-20 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            className="!font-extrabold !text-5xl !text-blue-800 text-center drop-shadow-lg"
          >
            Manage Your Projects Easily
          </Typography>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <Typography
            variant="h5"
            className="!mb-8 !text-gray-700 text-center max-w-xl mx-auto"
          >
            Welcome to ProjectFlow – the modern way to track, organize, and
            collaborate on all your projects.
            <br />
            Stay on top of your work, hit your deadlines, and work as a team,
            all in one beautiful workspace.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className="!rounded-full !px-8 !py-3 !bg-blue-600 !text-white !shadow-lg hover:!bg-blue-700 transition"
            onClick={handleButton}
          >
            Get Started Free
          </Button>
        </motion.div>
      </Box>

      {/* Features as Typography Cards, 2 per row */}
      <Container maxWidth="xl" id="features" className="py-10">
        <Typography
          variant="h4"
          className="!font-bold !text-blue-900  text-center "
        >
          All The Tools You Need In One Place
        </Typography>
        <Container maxWidth="xl" className="mt-10">
      <Grid container spacing={4} justifyContent="center" alignItems="stretch">
        {features.map((feat, i) => (
          <Grid
            item
            xs={12}
            sm={6}
            key={feat.title}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <motion.div
              variants={cardVariants}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.2 }}
              style={{ width: CARD_WIDTH }}
            >
              <Card
                className="rounded-xl shadow-xl border-2 border-blue-100 hover:scale-[1.03] hover:border-blue-400 transition-all"
                elevation={0}
                style={{
                  background: "linear-gradient(135deg, #f5f7fa 0%, #c3e0f7 100%)",
                  height: CARD_HEIGHT,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h5"
                    className="!font-bold !text-blue-700 !mb-2 tracking-wide"
                  >
                    {feat.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    className="!text-gray-700 !mb-2"
                  >
                    {feat.desc}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
      </Container>

      {/* Testimonials */}
      <Box
        id="testimonials"
        className="py-20 bg-gradient-to-tr from-blue-200 to-blue-50"
      >
        <Typography
          variant="h4"
          className="!font-bold !text-blue-900 mb-10 text-center"
        >
          What Our Users Say
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {testimonials.map((tes, i) => (
            <Grid item xs={12} sm={6} md={3} key={tes.name}>
              <motion.div
                variants={testimonialVariants}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.2 }}
              >
                <Card
                  className={`rounded-2xl shadow-2xl border-2 border-blue-200 hover:scale-105 transition-all bg-gradient-to-br ${tes.color}`}
                  elevation={0}
                  style={{
                    minHeight: 300,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CardContent className="flex flex-col items-center">
                    <Avatar
                      src={tes.avatar}
                      alt={tes.name}
                      sx={{ width: 64, height: 64, boxShadow: 3, mb: 2 }}
                    />
                    <Typography
                      variant="body1"
                      className="!italic !text-gray-700 text-center mb-3"
                    >
                      “{tes.text}”
                    </Typography>
                    <Typography className="mt-2 font-bold text-blue-900 text-center">
                      {tes.name}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* FAQ */}
      <Container maxWidth="xl"  id="faq" className="py-20 justify-center justify-items-center">
        <Typography
          variant="h4"
          className="!font-bold !text-blue-900 mb-10 text-center"
        >
          Frequently Asked Questions
        </Typography>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6}>
            <motion.div
              variants={cardVariants}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.2 }}
            >
              <Card className="rounded-xl border-2 border-blue-100 bg-white shadow hover:border-blue-400 transition-all">
                <CardContent>
                  <Typography
                    variant="subtitle1"
                    className="!font-bold !text-blue-800 mb-2"
                  >
                    Is ProjectFlow free to use?
                  </Typography>
                  <Typography variant="body2" className="!text-gray-700">
                    Yes! You can start for free with unlimited projects and
                    tasks. Upgrade anytime for advanced features.
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <motion.div
              variants={cardVariants}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.2 }}
            >
              <Card className="rounded-xl border-2 border-blue-100 bg-white shadow hover:border-blue-400 transition-all">
                <CardContent>
                  <Typography
                    variant="subtitle1"
                    className="!font-bold !text-blue-800 mb-2"
                  >
                    Can I integrate ProjectFlow with other tools?
                  </Typography>
                  <Typography variant="body2" className="!text-gray-700">
                    Absolutely! We support integrations with Slack, GitHub,
                    Google Drive, and many more.
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <motion.div
              variants={cardVariants}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.2 }}
            >
              <Card className="rounded-xl border-2 border-blue-100 bg-white shadow hover:border-blue-400 transition-all">
                <CardContent>
                  <Typography
                    variant="subtitle1"
                    className="!font-bold !text-blue-800 mb-2"
                  >
                    Is my data secure?
                  </Typography>
                  <Typography variant="body2" className="!text-gray-700">
                    Security is our top priority. All your data is encrypted and
                    backed up regularly.
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <motion.div
              variants={cardVariants}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.2 }}
            >
              <Card className="rounded-xl border-2 border-blue-100 bg-white shadow hover:border-blue-400 transition-all">
                <CardContent>
                  <Typography
                    variant="subtitle1"
                    className="!font-bold !text-blue-800 mb-2"
                  >
                    Do you offer customer support?
                  </Typography>
                  <Typography variant="body2" className="!text-gray-700">
                    Yes! Our support team is available 24/7 to help you with any
                    questions.
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Call to Action */}
       <Box className="py-20 bg-gradient-to-tr from-blue-100 to-blue-200">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center"
      >
        <Typography variant="h4" className="!font-bold !text-blue-900 mb-10 p-5" align="center">
          Ready to boost your productivity?
        </Typography>
        <Typography
          variant="body1"
          className="!text-gray-700 mb-6 max-w-xl p-5"
          align="center"
          sx={{ textAlign: "center" }}
        >
          Join thousands of teams already managing their work better with ProjectFlow. Sign up now and take your projects to the next level!
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          className="!rounded-full !px-8 !py-3 !bg-blue-600 !text-white !shadow-lg hover:!bg-blue-700 transition"
          onClick={handleButton}
        >
          Get Started Free
        </Button>
      </motion.div>
    </Box>

      <footer className="py-8 text-center text-gray-500">
        © {new Date().getFullYear()} ProjectFlow. All rights reserved.
      </footer>
    </Box>
  );
}
