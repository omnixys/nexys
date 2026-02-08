/**
 * @file /settings/page.tsx
 * @description Settings Dashboard - Bento Grid Layout
 */

"use client";

import { Box, Container, Typography, Chip, IconButton, Switch, alpha, Slider, Select, MenuItem, FormControl } from "@mui/material";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import DepthBlurLayer from "../../components/home/DepthBlurLayer";
import LayoutShell from "../../components/home/layout/LayoutShell";
import BentoTile from "../../components/home/BentoTile";
import { useAuth } from "../../providers/AuthProvider";
import SettingsIcon from '@mui/icons-material/Settings';
import PaletteIcon from '@mui/icons-material/Palette';
import LanguageIcon from '@mui/icons-material/Language';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EmailIcon from '@mui/icons-material/Email';
import StorageIcon from '@mui/icons-material/Storage';
import CloudIcon from '@mui/icons-material/Cloud';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import AppsIcon from '@mui/icons-material/Apps';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

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
const storageData = [
  { name: 'Used', value: 65, color: '#2196F3' },
  { name: 'Available', value: 35, color: '#4CAF50' },
];

const notificationData = [
  { type: 'Email', count: 124, color: '#FF9800' },
  { type: 'Push', count: 89, color: '#9C27B0' },
  { type: 'SMS', count: 23, color: '#00BCD4' },
];

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'it', name: 'Italian', flag: '🇮🇹' },
];

const currencies = ['USD', 'EUR', 'GBP', 'CHF', 'JPY'];

export default function SettingsPage() {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const [focused, setFocused] = useState<number | null>(null);
  const [animationKey, setAnimationKey] = useState(0);
  const [darkMode, setDarkMode] = useState(true);
  const [fontSize, setFontSize] = useState(16);
  const [language, setLanguage] = useState('en');
  const [currency, setCurrency] = useState('EUR');
  const [autoBackup, setAutoBackup] = useState(true);
  const [familySharing, setFamilySharing] = useState(false);

  useEffect(() => {
    setAnimationKey((k) => k + 1);
    setFocused(null);
  }, [pathname]);

  const settingCategories = [
    { id: 'appearance', name: 'Appearance', icon: <PaletteIcon />, count: 4, color: '#9C27B0' },
    { id: 'language', name: 'Language', icon: <LanguageIcon />, count: 2, color: '#2196F3' },
    { id: 'notifications', name: 'Notifications', icon: <NotificationsIcon />, count: 8, color: '#FF9800' },
    { id: 'data', name: 'Data', icon: <StorageIcon />, count: 6, color: '#4CAF50' },
    { id: 'privacy', name: 'Privacy', icon: <PrivacyTipIcon />, count: 5, color: '#00BCD4' },
    { id: 'family', name: 'Family', icon: <FamilyRestroomIcon />, count: 3, color: '#E91E63' },
  ];

  const quickSettings = [
    { id: 'darkMode', label: 'Dark Mode', enabled: darkMode, toggle: () => setDarkMode(!darkMode) },
    { id: 'autoBackup', label: 'Auto Backup', enabled: autoBackup, toggle: () => setAutoBackup(!autoBackup) },
    { id: 'familySharing', label: 'Family Sharing', enabled: familySharing, toggle: () => setFamilySharing(!familySharing) },
    { id: 'emailNotifications', label: 'Email Notifications', enabled: true, toggle: () => {} },
    { id: 'pushNotifications', label: 'Push Notifications', enabled: true, toggle: () => {} },
    { id: 'smsNotifications', label: 'SMS Notifications', enabled: false, toggle: () => {} },
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
            background: 'linear-gradient(90deg, #9C27B0 0%, #673AB7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Settings Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Customize your Nexys experience
          </Typography>
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
          {/* SETTINGS OVERVIEW (Span 6)          */}
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
                    background: 'linear-gradient(135deg, #9C27B0 0%, #673AB7 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <SettingsIcon sx={{ fontSize: 28, color: '#fff' }} />
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                      SETTINGS OVERVIEW
                    </Typography>
                    <Typography variant="h2" fontWeight={800} sx={{ 
                      background: 'linear-gradient(90deg, #9C27B0 0%, #673AB7 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}>
                      28 Settings
                    </Typography>
                  </Box>
                </Box>
                <Chip 
                  label="95% Configured" 
                  color="success"
                  sx={{ 
                    bgcolor: alpha('#4CAF50', 0.2),
                    color: '#4CAF50',
                    fontWeight: 600,
                    fontSize: '0.875rem'
                  }}
                />
              </Box>

              {/* Settings Categories */}
              <Box sx={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 2,
                flex: 1
              }}>
                {settingCategories.map((category) => (
                  <Box 
                    key={category.id}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: alpha(category.color, 0.1),
                      border: `1px solid ${alpha(category.color, 0.2)}`,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      '&:hover': {
                        bgcolor: alpha(category.color, 0.15),
                        transform: 'translateY(-4px)'
                      }
                    }}
                    onClick={() => setFocused(0)}
                  >
                    <Box sx={{ 
                      color: category.color,
                      mb: 1
                    }}>
                      {category.icon}
                    </Box>
                    <Typography variant="body2" fontWeight={600} sx={{ mb: 0.5 }}>
                      {category.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {category.count} options
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </BentoTile>

          {/* ==================================== */}
          {/* QUICK SETTINGS TOGGLES (Span 6)     */}
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
                Quick Settings
              </Typography>
              
              <Box sx={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 2
              }}>
                {quickSettings.map((setting) => (
                  <Box 
                    key={setting.id}
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
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    <Typography variant="body2" fontWeight={500}>
                      {setting.label}
                    </Typography>
                    
                    <Switch
                      size="small"
                      checked={setting.enabled}
                      onChange={setting.toggle}
                      sx={{
                        '& .MuiSwitch-track': {
                          bgcolor: setting.enabled ? alpha('#4CAF50', 0.5) : alpha('#757575', 0.5),
                        },
                        '& .MuiSwitch-thumb': {
                          bgcolor: setting.enabled ? '#4CAF50' : '#757575',
                        }
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          </BentoTile>

          {/* ==================================== */}
          {/* APPEARANCE SETTINGS (Span 4)        */}
          {/* ==================================== */}
          <BentoTile
            index={2}
            area="2 / 1 / span 1 / span 4"
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
                  <PaletteIcon sx={{ color: '#9C27B0' }} />
                  <Typography variant="h6" fontWeight={700}>
                    Appearance
                  </Typography>
                </Box>
                <IconButton size="small">
                  <MoreVertIcon />
                </IconButton>
              </Box>

              {/* Theme Toggle */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" fontWeight={500} sx={{ mb: 1 }}>
                  Theme
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  gap: 1,
                  bgcolor: 'rgba(255,255,255,0.05)',
                  borderRadius: 2,
                  p: 1
                }}>
                  <Box
                    onClick={() => setDarkMode(false)}
                    sx={{
                      flex: 1,
                      p: 2,
                      borderRadius: 2,
                      bgcolor: !darkMode ? alpha('#2196F3', 0.2) : 'transparent',
                      border: `1px solid ${!darkMode ? '#2196F3' : 'rgba(255,255,255,0.1)'}`,
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      '&:hover': {
                        bgcolor: !darkMode ? alpha('#2196F3', 0.3) : 'rgba(255,255,255,0.08)',
                      }
                    }}
                  >
                    <Typography variant="caption" fontWeight={500}>
                      Light
                    </Typography>
                  </Box>
                  <Box
                    onClick={() => setDarkMode(true)}
                    sx={{
                      flex: 1,
                      p: 2,
                      borderRadius: 2,
                      bgcolor: darkMode ? alpha('#9C27B0', 0.2) : 'transparent',
                      border: `1px solid ${darkMode ? '#9C27B0' : 'rgba(255,255,255,0.1)'}`,
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      '&:hover': {
                        bgcolor: darkMode ? alpha('#9C27B0', 0.3) : 'rgba(255,255,255,0.08)',
                      }
                    }}
                  >
                    <Typography variant="caption" fontWeight={500}>
                      Dark
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Font Size */}
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" fontWeight={500}>
                    Font Size
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {fontSize}px
                  </Typography>
                </Box>
                <Slider
                  value={fontSize}
                  onChange={(_, value) => setFontSize(value as number)}
                  min={12}
                  max={24}
                  step={1}
                  sx={{
                    color: '#9C27B0',
                    '& .MuiSlider-track': {
                      bgcolor: '#9C27B0',
                    },
                    '& .MuiSlider-thumb': {
                      bgcolor: '#9C27B0',
                      '&:hover': {
                        boxShadow: '0 0 0 8px rgba(156, 39, 176, 0.16)',
                      },
                    },
                  }}
                />
              </Box>

              {/* Zoom Level */}
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" fontWeight={500}>
                    Interface Zoom
                  </Typography>
                  <IconButton size="small">
                    <ZoomInIcon />
                  </IconButton>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {[100, 110, 125, 150].map((percent) => (
                    <Chip
                      key={percent}
                      label={`${percent}%`}
                      size="small"
                      sx={{
                        bgcolor: percent === 100 ? alpha('#9C27B0', 0.2) : 'rgba(255,255,255,0.05)',
                        color: percent === 100 ? '#9C27B0' : 'text.secondary',
                        cursor: 'pointer'
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Box>
          </BentoTile>

          {/* ==================================== */}
          {/* LANGUAGE & REGION (Span 4)          */}
          {/* ==================================== */}
          <BentoTile
            index={3}
            area="2 / 5 / span 1 / span 4"
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
                  <LanguageIcon sx={{ color: '#2196F3' }} />
                  <Typography variant="h6" fontWeight={700}>
                    Language & Region
                  </Typography>
                </Box>
                <IconButton size="small">
                  <MoreVertIcon />
                </IconButton>
              </Box>

              {/* Language Selection */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" fontWeight={500} sx={{ mb: 1 }}>
                  Language
                </Typography>
                <FormControl fullWidth size="small">
                  <Select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 2,
                      '& .MuiSelect-select': {
                        py: 1,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                      }
                    }}
                  >
                    {languages.map((lang) => (
                      <MenuItem key={lang.code} value={lang.code}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Typography variant="body1">{lang.flag}</Typography>
                          <Typography variant="body2">{lang.name}</Typography>
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              {/* Currency Selection */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" fontWeight={500} sx={{ mb: 1 }}>
                  Currency
                </Typography>
                <FormControl fullWidth size="small">
                  <Select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 2,
                      '& .MuiSelect-select': {
                        py: 1
                      }
                    }}
                  >
                    {currencies.map((curr) => (
                      <MenuItem key={curr} value={curr}>
                        <Typography variant="body2">{curr}</Typography>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              {/* Region Settings */}
              <Box>
                <Typography variant="body2" fontWeight={500} sx={{ mb: 1 }}>
                  Region Format
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Chip
                    label="Europe (DE)"
                    size="small"
                    sx={{
                      bgcolor: alpha('#2196F3', 0.2),
                      color: '#2196F3',
                      fontWeight: 500
                    }}
                  />
                  <Chip
                    label="24-hour"
                    size="small"
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.05)',
                      fontWeight: 500
                    }}
                  />
                  <Chip
                    label="Metric"
                    size="small"
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.05)',
                      fontWeight: 500
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </BentoTile>

          {/* ==================================== */}
          {/* NOTIFICATIONS (Span 4)              */}
          {/* ==================================== */}
          <BentoTile
            index={4}
            area="2 / 9 / span 1 / span 4"
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
                  <NotificationsIcon sx={{ color: '#FF9800' }} />
                  <Typography variant="h6" fontWeight={700}>
                    Notifications
                  </Typography>
                </Box>
                <Typography variant="caption" color="text.secondary">
                  236 total
                </Typography>
              </Box>

              {/* Notification Chart */}
              <Box sx={{ flex: 1, mb: 3 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={notificationData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="count"
                    >
                      {notificationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Box>

              {/* Notification Types */}
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                {notificationData.map((type) => (
                  <Box key={type.type} sx={{ textAlign: 'center' }}>
                    <Box sx={{ 
                      width: 12, 
                      height: 12, 
                      borderRadius: '50%', 
                      bgcolor: type.color,
                      mb: 0.5,
                      mx: 'auto'
                    }} />
                    <Typography variant="caption" color="text.secondary">
                      {type.type}
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {type.count}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </BentoTile>

          {/* ==================================== */}
          {/* DATA MANAGEMENT (Span 6)            */}
          {/* ==================================== */}
          <BentoTile
            index={5}
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
                  <StorageIcon sx={{ color: '#4CAF50' }} />
                  <Typography variant="h6" fontWeight={700}>
                    Data Management
                  </Typography>
                </Box>
                <IconButton size="small">
                  <CloudIcon />
                </IconButton>
              </Box>

              <Box sx={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 3,
                flex: 1
              }}>
                {/* Storage Usage */}
                <Box sx={{
                  gridColumn: 'span 1',
                  p: 3,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, rgba(33,150,243,0.15) 0%, rgba(0,188,212,0.1) 100%)',
                  border: '1px solid rgba(33,150,243,0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                  <Box>
                    <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
                      Storage
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      2.8 GB of 4.3 GB used
                    </Typography>
                    
                    {/* Storage Pie */}
                    <Box sx={{ width: 100, height: 100, mb: 2 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={storageData}
                            cx="50%"
                            cy="50%"
                            innerRadius={30}
                            outerRadius={45}
                            paddingAngle={0}
                            dataKey="value"
                            startAngle={90}
                            endAngle={450}
                          >
                            {storageData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </Box>
                  </Box>
                  
                  <Chip 
                    label="65% used" 
                    size="small"
                    sx={{ 
                      bgcolor: 'rgba(255,255,255,0.1)',
                      fontWeight: 500
                    }}
                  />
                </Box>

                {/* Backup Settings */}
                <Box sx={{
                  gridColumn: 'span 1',
                  p: 3,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, rgba(76,175,80,0.15) 0%, rgba(139,195,74,0.1) 100%)',
                  border: '1px solid rgba(76,175,80,0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                  <Box>
                    <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
                      Backup
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Last backup: 2 hours ago
                    </Typography>
                    
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.5 }}>
                        Frequency
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Chip
                          label="Daily"
                          size="small"
                          sx={{
                            bgcolor: autoBackup ? alpha('#4CAF50', 0.2) : 'rgba(255,255,255,0.05)',
                            color: autoBackup ? '#4CAF50' : 'text.secondary',
                            cursor: 'pointer'
                          }}
                          onClick={() => setAutoBackup(true)}
                        />
                        <Chip
                          label="Weekly"
                          size="small"
                          sx={{
                            bgcolor: !autoBackup ? alpha('#4CAF50', 0.2) : 'rgba(255,255,255,0.05)',
                            color: !autoBackup ? '#4CAF50' : 'text.secondary',
                            cursor: 'pointer'
                          }}
                          onClick={() => setAutoBackup(false)}
                        />
                      </Box>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Chip 
                      icon={<CheckCircleIcon />}
                      label="Encrypted" 
                      size="small"
                      sx={{ 
                        bgcolor: 'rgba(255,255,255,0.1)',
                        fontWeight: 500
                      }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      Cloud sync
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </BentoTile>

          {/* ==================================== */}
          {/* ADVANCED SETTINGS (Span 6)          */}
          {/* ==================================== */}
          <BentoTile
            index={6}
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
                Advanced Settings
              </Typography>
              
              <Box sx={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 2,
                flex: 1
              }}>
                <ActionCard 
                  title="Keyboard Shortcuts"
                  description="Customize hotkeys"
                  color="#2196F3"
                  icon={<KeyboardIcon />}
                  enabled={true}
                />
                <ActionCard 
                  title="Widgets"
                  description="Dashboard widgets"
                  color="#4CAF50"
                  icon={<AppsIcon />}
                  enabled={true}
                />
                <ActionCard 
                  title="API Access"
                  description="Developer settings"
                  color="#9C27B0"
                  icon={<SettingsIcon />}
                  enabled={false}
                />
                <ActionCard 
                  title="Cache"
                  description="Clear app cache"
                  color="#FF9800"
                  icon={<StorageIcon />}
                  enabled={true}
                />
              </Box>
            </Box>
          </BentoTile>

          {/* ==================================== */}
          {/* SETTINGS STATS (Span 12)            */}
          {/* ==================================== */}
          <BentoTile
            index={7}
            area="4 / 1 / span 1 / span 12"
            focused={focused}
            setFocused={setFocused}
          >
            <Box sx={{ 
              width: '100%', 
              height: '100%',
              p: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <StatItem 
                label="Active Settings" 
                value="28" 
                change="+3"
                color="#9C27B0"
              />
              <StatItem 
                label="Customizations" 
                value="12" 
                change="+2"
                color="#2196F3"
              />
              <StatItem 
                label="Data Stored" 
                value="2.8 GB" 
                change="+450 MB"
                color="#4CAF50"
              />
              <StatItem 
                label="Notifications" 
                value="236" 
                change="+42"
                color="#FF9800"
              />
              <StatItem 
                label="Last Updated" 
                value="Now" 
                change=""
                color="#00BCD4"
              />
            </Box>
          </BentoTile>
        </Box>
      </Container>
    </LayoutShell>
  );
}

function ActionCard({ title, description, color, icon, enabled }: { 
  title: string; 
  description: string;
  color: string;
  icon: React.ReactNode;
  enabled: boolean;
}) {
  return (
    <Box sx={{
      p: 3,
      borderRadius: 3,
      bgcolor: alpha(color, 0.1),
      border: `1px solid ${alpha(color, 0.2)}`,
      cursor: 'pointer',
      transition: 'all 0.3s',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      '&:hover': {
        bgcolor: alpha(color, 0.15),
        transform: 'translateY(-4px)',
        boxShadow: `0 8px 32px ${alpha(color, 0.2)}`
      }
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          bgcolor: alpha(color, 0.2),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color
        }}>
          {icon}
        </Box>
        <Chip 
          label={enabled ? "On" : "Off"}
          size="small"
          sx={{ 
            bgcolor: enabled ? alpha('#4CAF50', 0.2) : alpha('#757575', 0.2),
            color: enabled ? '#4CAF50' : '#757575',
            fontSize: '0.7rem'
          }}
        />
      </Box>
      
      <Box>
        <Typography variant="body1" fontWeight={600} sx={{ mb: 0.5 }}>
          {title}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {description}
        </Typography>
      </Box>
    </Box>
  );
}

function StatItem({ label, value, change, color }: { 
  label: string; 
  value: string;
  change: string;
  color: string;
}) {
  const isPositive = change.startsWith('+');
  const isNegative = change.startsWith('-');

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="caption" color="text.secondary" sx={{ mb: 1 }}>
        {label}
      </Typography>
      <Typography 
        variant="h3" 
        fontWeight={800}
        sx={{ color, mb: 0.5 }}
      >
        {value}
      </Typography>
      {change && (
        <Typography 
          variant="caption" 
          sx={{ 
            color: isPositive ? '#4CAF50' : isNegative ? '#FF5252' : 'text.secondary',
            fontWeight: 600
          }}
        >
          {change}
        </Typography>
      )}
    </Box>
  );
}