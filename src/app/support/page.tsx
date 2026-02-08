/**
 * @file /support/page.tsx
 * @description Support Center - Bento Grid Layout
 */

"use client";

import { Box, Container, Typography, Chip, IconButton, TextField, Button, alpha, Avatar, Divider, Tab, Tabs } from "@mui/material";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import DepthBlurLayer from "../../components/home/DepthBlurLayer";
import LayoutShell from "../../components/home/layout/LayoutShell";
import BentoTile from "../../components/home/BentoTile";
import { useAuth } from "../../providers/AuthProvider";
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import ChatIcon from '@mui/icons-material/Chat';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import ArticleIcon from '@mui/icons-material/Article';
import VideocamIcon from '@mui/icons-material/Videocam';
import ForumIcon from '@mui/icons-material/Forum';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ScheduleIcon from '@mui/icons-material/Schedule';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SearchIcon from '@mui/icons-material/Search';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

/* =====================================================
   STAGGER CONFIG
===================================================== */

const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

// Mock data
const supportData = [
  { day: 'Mon', tickets: 12, resolved: 10 },
  { day: 'Tue', tickets: 18, resolved: 15 },
  { day: 'Wed', tickets: 15, resolved: 12 },
  { day: 'Thu', tickets: 22, resolved: 18 },
  { day: 'Fri', tickets: 16, resolved: 14 },
  { day: 'Sat', tickets: 8, resolved: 6 },
  { day: 'Sun', tickets: 5, resolved: 4 },
];

const categoryData = [
  { category: 'Technical', tickets: 45, color: '#2196F3' },
  { category: 'Billing', tickets: 32, color: '#4CAF50' },
  { category: 'Account', tickets: 28, color: '#9C27B0' },
  { category: 'Security', tickets: 18, color: '#FF9800' },
  { category: 'Other', tickets: 12, color: '#00BCD4' },
];

const supportAgents = [
  { id: 1, name: 'Sarah Chen', role: 'Senior Support', status: 'online', rating: 4.9, languages: ['EN', 'DE'], avatarColor: '#2196F3' },
  { id: 2, name: 'Marcus Weber', role: 'Technical Expert', status: 'online', rating: 4.8, languages: ['DE', 'FR'], avatarColor: '#4CAF50' },
  { id: 3, name: 'Emma Rodriguez', role: 'Billing Specialist', status: 'away', rating: 4.7, languages: ['EN', 'ES'], avatarColor: '#9C27B0' },
  { id: 4, name: 'David Kim', role: 'Security Expert', status: 'offline', rating: 4.9, languages: ['EN', 'KO'], avatarColor: '#FF9800' },
];

const faqCategories = [
  { id: 'account', name: 'Account', count: 24, icon: '👤' },
  { id: 'security', name: 'Security', count: 18, icon: '🔒' },
  { id: 'billing', name: 'Billing', count: 32, icon: '💳' },
  { id: 'technical', name: 'Technical', count: 45, icon: '⚙️' },
  { id: 'cards', name: 'Cards', count: 21, icon: '💳' },
  { id: 'investments', name: 'Investments', count: 28, icon: '📈' },
];

const recentTickets = [
  { id: 'TKT-7842', subject: 'Two-factor authentication issue', category: 'Security', status: 'resolved', priority: 'high', created: '2 hours ago' },
  { id: 'TKT-7841', subject: 'International transfer delay', category: 'Transactions', status: 'in-progress', priority: 'medium', created: '5 hours ago' },
  { id: 'TKT-7840', subject: 'Card not working abroad', category: 'Cards', status: 'open', priority: 'high', created: '1 day ago' },
  { id: 'TKT-7839', subject: 'Statement download problem', category: 'Technical', status: 'resolved', priority: 'low', created: '2 days ago' },
  { id: 'TKT-7838', subject: 'Investment portfolio question', category: 'Investments', status: 'open', priority: 'medium', created: '3 days ago' },
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`support-tabpanel-${index}`}
      aria-labelledby={`support-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

export default function SupportPage() {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const [focused, setFocused] = useState<number | null>(null);
  const [animationKey, setAnimationKey] = useState(0);
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setAnimationKey((k) => k + 1);
    setFocused(null);
  }, [pathname]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const supportMetrics = {
    responseTime: '2.4 min',
    satisfaction: '96%',
    resolutionRate: '89%',
    activeTickets: 12,
  };

  const contactMethods = [
    { type: 'Live Chat', available: true, waitTime: '< 1 min', icon: <ChatIcon />, color: '#2196F3' },
    { type: 'Phone', available: true, waitTime: '3 min', icon: <PhoneIcon />, color: '#4CAF50' },
    { type: 'Email', available: true, waitTime: '2 hours', icon: <EmailIcon />, color: '#FF9800' },
    { type: 'Video Call', available: false, waitTime: '—', icon: <VideocamIcon />, color: '#9C27B0' },
  ];

  return (
    <LayoutShell user={user} loading={loading}>
      <Container
        maxWidth={false}
        sx={{
          maxWidth: 1440,
          mx: "auto",
          px: 4,
          py: 4,
        }}
      >
        <DepthBlurLayer active={focused !== null} />

        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight={800} sx={{ 
            mb: 1,
            background: 'linear-gradient(90deg, #2196F3 0%, #00BCD4 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Support Center
          </Typography>
          <Typography variant="body1" color="text.secondary">
            24/7 support for all your banking needs
          </Typography>
        </Box>

        {/* Search Bar */}
        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            placeholder="Search for help articles, FAQs, or describe your issue..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              sx: {
                bgcolor: 'rgba(255,255,255,0.05)',
                borderRadius: 3,
                border: '1px solid rgba(255,255,255,0.1)',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.08)',
                }
              }
            }}
          />
        </Box>

        <Box
          key={animationKey}
          component={motion.div}
          variants={gridVariants}
          initial="hidden"
          animate="visible"
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gridTemplateRows: "200px 300px 300px 250px",
            gap: 3,
            position: "relative",
            zIndex: 1300,
          }}
        >
          {/* ==================================== */}
          {/* SUPPORT METRICS (Span 6)            */}
          {/* ==================================== */}
          <BentoTile
            index={0}
            area="1 / 1 / span 1 / span 6"
            focused={focused}
            setFocused={setFocused}
            heavy
          >
            <Box sx={{ 
              width: '100%', 
              height: '100%',
              p: 3,
              display: 'flex',
              flexDirection: 'column'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #2196F3 0%, #00BCD4 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <SupportAgentIcon sx={{ fontSize: 28, color: '#fff' }} />
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                      SUPPORT PERFORMANCE
                    </Typography>
                    <Typography variant="h2" fontWeight={800} sx={{ 
                      background: 'linear-gradient(90deg, #2196F3 0%, #00BCD4 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}>
                      24/7 Available
                    </Typography>
                  </Box>
                </Box>
                <Chip 
                  label="Operational" 
                  color="success"
                  sx={{ 
                    bgcolor: alpha('#4CAF50', 0.2),
                    color: '#4CAF50',
                    fontWeight: 600,
                    fontSize: '0.875rem'
                  }}
                />
              </Box>

              {/* Metrics Grid */}
              <Box sx={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 2,
                flex: 1
              }}>
                <MetricCard 
                  label="Avg Response Time"
                  value={supportMetrics.responseTime}
                  trend="+0.2 min"
                  color="#2196F3"
                />
                <MetricCard 
                  label="Satisfaction Rate"
                  value={supportMetrics.satisfaction}
                  trend="+2%"
                  color="#4CAF50"
                />
                <MetricCard 
                  label="Resolution Rate"
                  value={supportMetrics.resolutionRate}
                  trend="+5%"
                  color="#9C27B0"
                />
                <MetricCard 
                  label="Active Tickets"
                  value={supportMetrics.activeTickets.toString()}
                  trend="-3"
                  color="#FF9800"
                />
              </Box>
            </Box>
          </BentoTile>

          {/* ==================================== */}
          {/* CONTACT OPTIONS (Span 6)            */}
          {/* ==================================== */}
          <BentoTile
            index={1}
            area="1 / 7 / span 1 / span 6"
            focused={focused}
            setFocused={setFocused}
          >
            <Box sx={{ 
              width: '100%', 
              height: '100%',
              p: 3
            }}>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>
                Contact Options
              </Typography>
              
              <Box sx={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 2
              }}>
                {contactMethods.map((method) => (
                  <Box 
                    key={method.type}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: method.available ? alpha(method.color, 0.1) : 'rgba(255,255,255,0.05)',
                      border: `1px solid ${method.available ? alpha(method.color, 0.2) : 'rgba(255,255,255,0.1)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s',
                      '&:hover': {
                        bgcolor: method.available ? alpha(method.color, 0.15) : 'rgba(255,255,255,0.08)',
                        transform: 'translateY(-2px)'
                      },
                      cursor: method.available ? 'pointer' : 'default',
                      opacity: method.available ? 1 : 0.6
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Box sx={{ 
                        color: method.available ? method.color : 'text.secondary'
                      }}>
                        {method.icon}
                      </Box>
                      <Box>
                        <Typography variant="body2" fontWeight={500}>
                          {method.type}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {method.waitTime} wait
                        </Typography>
                      </Box>
                    </Box>
                    
                    {method.available ? (
                      <Chip 
                        label="Available" 
                        size="small"
                        sx={{ 
                          bgcolor: alpha('#4CAF50', 0.2),
                          color: '#4CAF50',
                          fontSize: '0.7rem'
                        }}
                      />
                    ) : (
                      <Chip 
                        label="Unavailable" 
                        size="small"
                        sx={{ 
                          bgcolor: alpha('#757575', 0.2),
                          color: '#757575',
                          fontSize: '0.7rem'
                        }}
                      />
                    )}
                  </Box>
                ))}
              </Box>
            </Box>
          </BentoTile>

          {/* ==================================== */}
          {/* SUPPORT ANALYTICS (Span 6)          */}
          {/* ==================================== */}
          <BentoTile
            index={2}
            area="2 / 1 / span 1 / span 6"
            focused={focused}
            setFocused={setFocused}
          >
            <Box sx={{ 
              width: '100%', 
              height: '100%',
              p: 3,
              display: 'flex',
              flexDirection: 'column'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <TrendingUpIcon sx={{ color: '#2196F3' }} />
                  <Typography variant="h6" fontWeight={700}>
                    Support Analytics
                  </Typography>
                </Box>
                <Typography variant="caption" color="text.secondary">
                  Last 7 days
                </Typography>
              </Box>

              {/* Tickets Chart */}
              <Box sx={{ flex: 1 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={supportData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis 
                      dataKey="day" 
                      stroke="rgba(255,255,255,0.5)"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="rgba(255,255,255,0.5)"
                      fontSize={12}
                    />
                    <Tooltip
                      contentStyle={{
                        background: 'rgba(0,0,0,0.8)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: 8,
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="tickets" 
                      stroke="#2196F3" 
                      strokeWidth={3}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="resolved" 
                      stroke="#4CAF50" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>

              {/* Legend */}
              <Box sx={{ display: 'flex', gap: 3, mt: 2, justifyContent: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 12, height: 3, bgcolor: '#2196F3' }} />
                  <Typography variant="caption" color="text.secondary">
                    Tickets opened
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 12, height: 3, bgcolor: '#4CAF50' }} />
                  <Typography variant="caption" color="text.secondary">
                    Tickets resolved
                  </Typography>
                </Box>
              </Box>
            </Box>
          </BentoTile>

          {/* ==================================== */}
          {/* CATEGORY DISTRIBUTION (Span 6)      */}
          {/* ==================================== */}
          <BentoTile
            index={3}
            area="2 / 7 / span 1 / span 6"
            focused={focused}
            setFocused={setFocused}
          >
            <Box sx={{ 
              width: '100%', 
              height: '100%',
              p: 3,
              display: 'flex',
              flexDirection: 'column'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <ArticleIcon sx={{ color: '#FF9800' }} />
                  <Typography variant="h6" fontWeight={700}>
                    Category Distribution
                  </Typography>
                </Box>
                <Typography variant="caption" color="text.secondary">
                  135 total tickets
                </Typography>
              </Box>

              {/* Category Chart */}
              <Box sx={{ flex: 1 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                    <XAxis 
                      dataKey="category" 
                      stroke="rgba(255,255,255,0.5)"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="rgba(255,255,255,0.5)"
                      fontSize={12}
                    />
                    <Tooltip
                      contentStyle={{
                        background: 'rgba(0,0,0,0.8)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: 8,
                      }}
                    />
                    <Bar dataKey="tickets" radius={[4, 4, 0, 0]}>
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Box>

              {/* Category Labels */}
              <Box sx={{ display: 'flex', gap: 2, mt: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
                {categoryData.map((category) => (
                  <Box key={category.category} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Box sx={{ 
                      width: 8, 
                      height: 8, 
                      borderRadius: '50%', 
                      bgcolor: category.color 
                    }} />
                    <Typography variant="caption" color="text.secondary">
                      {category.category} ({category.tickets})
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </BentoTile>

          {/* ==================================== */}
          {/* LIVE CHAT & AGENTS (Span 6)         */}
          {/* ==================================== */}
          <BentoTile
            index={4}
            area="3 / 1 / span 1 / span 6"
            focused={focused}
            setFocused={setFocused}
            heavy
          >
            <Box sx={{ 
              width: '100%', 
              height: '100%',
              p: 3,
              display: 'flex',
              flexDirection: 'column'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <ChatIcon sx={{ color: '#2196F3' }} />
                  <Typography variant="h6" fontWeight={700}>
                    Live Chat Support
                  </Typography>
                </Box>
                <Chip 
                  label="Online" 
                  color="success"
                  size="small"
                  sx={{ 
                    bgcolor: alpha('#4CAF50', 0.2),
                    color: '#4CAF50'
                  }}
                />
              </Box>

              {/* Chat Interface */}
              <Box sx={{ 
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                mb: 2
              }}>
                {/* Chat Messages */}
                <Box sx={{ 
                  flex: 1,
                  bgcolor: 'rgba(0,0,0,0.2)',
                  borderRadius: 2,
                  p: 2,
                  mb: 2,
                  overflowY: 'auto'
                }}>
                  {/* Agent Message */}
                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: '#2196F3' }}>
                      S
                    </Avatar>
                    <Box>
                      <Box sx={{ 
                        bgcolor: 'rgba(33,150,243,0.2)',
                        borderRadius: 2,
                        p: 2,
                        maxWidth: '80%'
                      }}>
                        <Typography variant="body2">
                          Hello! I'm Sarah from Nexys Support. How can I help you today?
                        </Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, ml: 1 }}>
                        2 min ago
                      </Typography>
                    </Box>
                  </Box>

                  {/* User Message */}
                  <Box sx={{ display: 'flex', gap: 1, mb: 2, justifyContent: 'flex-end' }}>
                    <Box>
                      <Box sx={{ 
                        bgcolor: 'rgba(76,175,80,0.2)',
                        borderRadius: 2,
                        p: 2,
                        maxWidth: '80%'
                      }}>
                        <Typography variant="body2">
                          I'm having issues with my international transfer. It's been pending for 2 days.
                        </Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, mr: 1, textAlign: 'right' }}>
                        Just now
                      </Typography>
                    </Box>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: '#4CAF50' }}>
                      {user?.personalInfo?.firstName?.charAt(0) || 'U'}
                    </Avatar>
                  </Box>

                  {/* Agent Typing */}
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', opacity: 0.7 }}>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: '#2196F3' }}>
                      S
                    </Avatar>
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      <Box sx={{ 
                        width: 8, 
                        height: 8, 
                        borderRadius: '50%', 
                        bgcolor: '#2196F3',
                        animation: 'bounce 1.4s infinite',
                        animationDelay: '0s'
                      }} />
                      <Box sx={{ 
                        width: 8, 
                        height: 8, 
                        borderRadius: '50%', 
                        bgcolor: '#2196F3',
                        animation: 'bounce 1.4s infinite',
                        animationDelay: '0.2s'
                      }} />
                      <Box sx={{ 
                        width: 8, 
                        height: 8, 
                        borderRadius: '50%', 
                        bgcolor: '#2196F3',
                        animation: 'bounce 1.4s infinite',
                        animationDelay: '0.4s'
                      }} />
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      Sarah is typing...
                    </Typography>
                  </Box>
                </Box>

                {/* Message Input */}
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    fullWidth
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    size="small"
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.05)',
                      borderRadius: 2,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      }
                    }}
                  />
                  <IconButton sx={{ 
                    bgcolor: '#2196F3',
                    color: 'white',
                    '&:hover': { bgcolor: '#1976D2' }
                  }}>
                    <AttachFileIcon />
                  </IconButton>
                  <IconButton sx={{ 
                    bgcolor: '#4CAF50',
                    color: 'white',
                    '&:hover': { bgcolor: '#388E3C' }
                  }}>
                    <SendIcon />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </BentoTile>

          {/* ==================================== */}
          {/* SUPPORT AGENTS (Span 6)             */}
          {/* ==================================== */}
          <BentoTile
            index={5}
            area="3 / 7 / span 1 / span 6"
            focused={focused}
            setFocused={setFocused}
          >
            <Box sx={{ 
              width: '100%', 
              height: '100%',
              p: 3,
              display: 'flex',
              flexDirection: 'column'
            }}>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>
                Support Team
              </Typography>
              
              <Box sx={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 2,
                flex: 1
              }}>
                {supportAgents.map((agent) => (
                  <Box 
                    key={agent.id}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      '&:hover': {
                        bgcolor: 'rgba(255,255,255,0.08)',
                        transform: 'translateY(-4px)'
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Avatar sx={{ 
                        width: 48, 
                        height: 48, 
                        bgcolor: agent.avatarColor,
                        fontWeight: 600
                      }}>
                        {agent.name.charAt(0)}
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body1" fontWeight={600}>
                          {agent.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {agent.role}
                        </Typography>
                      </Box>
                      <Box sx={{ 
                        width: 8, 
                        height: 8, 
                        borderRadius: '50%', 
                        bgcolor: agent.status === 'online' ? '#4CAF50' : 
                                 agent.status === 'away' ? '#FF9800' : '#757575'
                      }} />
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Typography variant="body2" fontWeight={600} color="#FF9800">
                          {agent.rating}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          rating
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        {agent.languages.map((lang) => (
                          <Chip
                            key={lang}
                            label={lang}
                            size="small"
                            sx={{
                              bgcolor: 'rgba(255,255,255,0.1)',
                              fontSize: '0.7rem',
                              height: 20
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </BentoTile>

          {/* ==================================== */}
          {/* FAQ & RESOURCES (Span 8)            */}
          {/* ==================================== */}
          <BentoTile
            index={6}
            area="4 / 1 / span 1 / span 8"
            focused={focused}
            setFocused={setFocused}
          >
            <Box sx={{ 
              width: '100%', 
              height: '100%',
              p: 3,
              display: 'flex',
              flexDirection: 'column'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <LiveHelpIcon sx={{ color: '#FF9800' }} />
                  <Typography variant="h6" fontWeight={700}>
                    Help Resources
                  </Typography>
                </Box>
                <Tabs 
                  value={tabValue} 
                  onChange={handleTabChange}
                  sx={{
                    minHeight: 'auto',
                    '& .MuiTab-root': {
                      minHeight: 'auto',
                      padding: '6px 12px',
                      fontSize: '0.875rem'
                    }
                  }}
                >
                  <Tab label="FAQ" />
                  <Tab label="Tickets" />
                  <Tab label="Guides" />
                </Tabs>
              </Box>

              <TabPanel value={tabValue} index={0}>
                <Box sx={{ 
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 2
                }}>
                  {faqCategories.map((category) => (
                    <Box 
                      key={category.id}
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        bgcolor: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        '&:hover': {
                          bgcolor: 'rgba(255,255,255,0.08)',
                          transform: 'translateY(-2px)'
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                        <Typography variant="h5">
                          {category.icon}
                        </Typography>
                        <Typography variant="body1" fontWeight={600}>
                          {category.name}
                        </Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        {category.count} articles
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </TabPanel>

              <TabPanel value={tabValue} index={1}>
                <Box sx={{ 
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1
                }}>
                  {recentTickets.map((ticket) => (
                    <Box 
                      key={ticket.id}
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        bgcolor: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'all 0.2s',
                        '&:hover': {
                          bgcolor: 'rgba(255,255,255,0.08)',
                        }
                      }}
                    >
                      <Box>
                        <Typography variant="body2" fontWeight={600} sx={{ mb: 0.5 }}>
                          {ticket.subject}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                          <Chip 
                            label={ticket.category}
                            size="small"
                            sx={{
                              bgcolor: 'rgba(255,255,255,0.1)',
                              fontSize: '0.7rem'
                            }}
                          />
                          <Typography variant="caption" color="text.secondary">
                            {ticket.id} • {ticket.created}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Chip 
                          label={ticket.status}
                          size="small"
                          sx={{
                            bgcolor: ticket.status === 'resolved' ? alpha('#4CAF50', 0.2) : 
                                     ticket.status === 'in-progress' ? alpha('#2196F3', 0.2) : 
                                     alpha('#FF9800', 0.2),
                            color: ticket.status === 'resolved' ? '#4CAF50' : 
                                   ticket.status === 'in-progress' ? '#2196F3' : '#FF9800',
                            fontSize: '0.7rem'
                          }}
                        />
                        <Chip 
                          label={ticket.priority}
                          size="small"
                          sx={{
                            bgcolor: ticket.priority === 'high' ? alpha('#FF5252', 0.2) : 
                                     ticket.priority === 'medium' ? alpha('#FF9800', 0.2) : 
                                     alpha('#757575', 0.2),
                            color: ticket.priority === 'high' ? '#FF5252' : 
                                   ticket.priority === 'medium' ? '#FF9800' : '#757575',
                            fontSize: '0.7rem'
                          }}
                        />
                      </Box>
                    </Box>
                  ))}
                </Box>
              </TabPanel>

              <TabPanel value={tabValue} index={2}>
                <Box sx={{ 
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: 2
                }}>
                  <GuideCard 
                    title="Getting Started"
                    description="Learn the basics of Nexys Banking"
                    icon="🎯"
                    color="#2196F3"
                  />
                  <GuideCard 
                    title="Security Best Practices"
                    description="Keep your account safe and secure"
                    icon="🔒"
                    color="#4CAF50"
                  />
                  <GuideCard 
                    title="Investment Guide"
                    description="How to start investing with Nexys"
                    icon="📈"
                    color="#9C27B0"
                  />
                  <GuideCard 
                    title="Mobile App Tips"
                    description="Make the most of our mobile app"
                    icon="📱"
                    color="#FF9800"
                  />
                </Box>
              </TabPanel>
            </Box>
          </BentoTile>

          {/* ==================================== */}
          {/* QUICK SUPPORT (Span 4)              */}
          {/* ==================================== */}
          <BentoTile
            index={7}
            area="4 / 9 / span 1 / span 4"
            focused={focused}
            setFocused={setFocused}
          >
            <Box sx={{ 
              width: '100%', 
              height: '100%',
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <Box>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                  Need Immediate Help?
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Our team is ready to assist you 24/7
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Button
                  variant="contained"
                  startIcon={<ChatIcon />}
                  sx={{
                    bgcolor: '#2196F3',
                    borderRadius: 2,
                    py: 1.5,
                    '&:hover': { bgcolor: '#1976D2' }
                  }}
                >
                  Start Live Chat
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<PhoneIcon />}
                  sx={{
                    borderColor: '#4CAF50',
                    color: '#4CAF50',
                    borderRadius: 2,
                    py: 1.5,
                    '&:hover': { 
                      borderColor: '#388E3C',
                      bgcolor: alpha('#4CAF50', 0.1)
                    }
                  }}
                >
                  Call Support
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<EmailIcon />}
                  sx={{
                    borderColor: '#FF9800',
                    color: '#FF9800',
                    borderRadius: 2,
                    py: 1.5,
                    '&:hover': { 
                      borderColor: '#F57C00',
                      bgcolor: alpha('#FF9800', 0.1)
                    }
                  }}
                >
                  Send Email
                </Button>
              </Box>

              <Box sx={{ mt: 'auto', pt: 2, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <ScheduleIcon sx={{ fontSize: 16, color: '#4CAF50' }} />
                  <Typography variant="caption" color="text.secondary">
                    Current wait time: <Box component="span" fontWeight={600} color="#4CAF50">2 minutes</Box>
                  </Typography>
                </Box>
              </Box>
            </Box>
          </BentoTile>
        </Box>
      </Container>
    </LayoutShell>
  );
}

function MetricCard({ label, value, trend, color }: { 
  label: string; 
  value: string;
  trend: string;
  color: string;
}) {
  const isPositive = trend.startsWith('+');
  const isNegative = trend.startsWith('-');

  return (
    <Box sx={{
      p: 2,
      borderRadius: 2,
      bgcolor: alpha(color, 0.1),
      border: `1px solid ${alpha(color, 0.2)}`,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      textAlign: 'center'
    }}>
      <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5 }}>
        {label}
      </Typography>
      <Typography 
        variant="h3" 
        fontWeight={800}
        sx={{ 
          color,
          mb: 0.5,
          fontSize: '2rem'
        }}
      >
        {value}
      </Typography>
      {trend && (
        <Typography 
          variant="caption" 
          sx={{ 
            color: isPositive ? '#4CAF50' : isNegative ? '#FF5252' : 'text.secondary',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 0.5
          }}
        >
          {isPositive ? '↗' : isNegative ? '↘' : '→'} {trend}
        </Typography>
      )}
    </Box>
  );
}

function GuideCard({ title, description, icon, color }: { 
  title: string; 
  description: string;
  icon: string;
  color: string;
}) {
  return (
    <Box sx={{
      p: 2,
      borderRadius: 2,
      bgcolor: alpha(color, 0.1),
      border: `1px solid ${alpha(color, 0.2)}`,
      cursor: 'pointer',
      transition: 'all 0.2s',
      '&:hover': {
        bgcolor: alpha(color, 0.15),
        transform: 'translateY(-2px)'
      }
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
        <Typography variant="h5">
          {icon}
        </Typography>
        <Typography variant="body1" fontWeight={600}>
          {title}
        </Typography>
      </Box>
      <Typography variant="caption" color="text.secondary">
        {description}
      </Typography>
    </Box>
  );
}