/**
 * @file ProfileContactsCarousel.tsx
 * @description Futuristic network visualization with interactive nodes
 */

"use client";

import {
  Box,
  Typography,
  Chip,
  IconButton,
  alpha,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { User } from "@/types/user/user.type";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HubIcon from "@mui/icons-material/Hub";
import BoltIcon from "@mui/icons-material/Bolt";
import SecurityIcon from "@mui/icons-material/Security";
import LinkIcon from "@mui/icons-material/Link";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";

type Props = {
  user: User;
};

type Contact = User["contacts"][number];
type Node = {
  id: string;
  contact: Contact;
  x: number;
  y: number;
  size: number;
  color: string;
};

export default function ProfileContactsCarousel({ user }: Props) {
  const theme = useTheme();
  const contacts: Contact[] = user?.contacts ?? [];
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [pan, setPan] = useState({ x: 0, y: 0 });


  // Generate network nodes
  const nodes: Node[] = contacts.map((contact, index) => {
    const angle = (index * 2 * Math.PI) / contacts.length;
    const distance = 120;

    return {
      id: contact.id,
      contact,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      size: contact.emergency ? 60 : 50,
      color: getNodeColor(contact),
    };
  });

  function getNodeColor(contact: Contact): string {
    const type = contact.relationship;
    switch (type) {
      case "FAMILY":
        return "#FF6B6B";
      case "PARTNER":
        return "#FF4081";
      case "BUSINESS_PARTNER":
        return "#2196F3";
      case "COLLEAGUE":
        return "#4CAF50";
      case "FRIEND":
        return "#9C27B0";
      default:
        return "#757575";
    }
  }

  useEffect(() => {
    if (contacts.length > 0 && !selectedNode) {
      setSelectedNode(nodes[0]);
    }
  }, [contacts, nodes, selectedNode]);

  if (contacts.length === 0) {
    return (
      <Box
        sx={{
          borderRadius: 4,
          p: 3,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, rgba(0,200,255,0.05) 0%, rgba(100,100,255,0.05) 100%)",
          border: "1px solid rgba(0,200,255,0.2)",
          boxShadow: "0 0 60px rgba(0,200,255,0.1)",
        }}
      >
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "rgba(0,200,255,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 3,
            border: "1px solid rgba(0,200,255,0.3)",
          }}
        >
          <HubIcon sx={{ fontSize: 40, color: "#00c8ff" }} />
        </Box>
        <Typography
          variant="h6"
          sx={{
            color: "#fff",
            mb: 1,
            textShadow: "0 0 10px rgba(0,200,255,0.5)",
          }}
        >
          NETWORK EMPTY
        </Typography>
        <Typography
          variant="caption"
          sx={{ color: "#00c8ff", textAlign: "center" }}
        >
          Establish first connection
        </Typography>
      </Box>
    );
  }

  const totalLimit = contacts.reduce((sum, c) => sum + c.withdrawalLimit, 0);
  const avgLimit = totalLimit / contacts.length;

  return (
    <Box
      sx={{
        borderRadius: 4,
        p: 3,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background:
          "linear-gradient(135deg, rgba(0,200,255,0.05) 0%, rgba(100,100,255,0.05) 100%)",
        border: "1px solid rgba(0,200,255,0.2)",
        boxShadow: `
          0 0 60px rgba(0,200,255,0.1),
          inset 0 0 20px rgba(0,200,255,0.05)
        `,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated background grid */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
          radial-gradient(circle at 50% 50%, rgba(0,200,255,0.05) 0%, transparent 70%)
        `,
          zIndex: 0,
        }}
      />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box>
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{
              color: "#fff",
              textShadow: "0 0 10px rgba(0,200,255,0.5)",
              mb: 0.5,
            }}
          >
            TRUST NETWORK
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: "#00c8ff",
              letterSpacing: "1px",
            }}
          >
            {contacts.length} NODES • SECURE CONNECTIONS
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton
            size="small"
            onClick={() => setZoom((zoom) => Math.max(0.5, zoom - 0.1))}
            sx={{ color: "#00c8ff" }}
          >
            <ZoomOutIcon />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => setZoom((zoom) => Math.min(2, zoom + 0.1))}
            sx={{ color: "#00c8ff" }}
          >
            <ZoomInIcon />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => setRotation((rotation) => rotation + 45)}
            sx={{ color: "#00c8ff" }}
          >
            <RotateLeftIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Network Visualization */}
      <Box
        sx={{
          flex: 1,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          zIndex: 1,
        }}
      >
        {/* Connection Lines */}
        <svg
          width="100%"
          height="100%"
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          {nodes.map((node) => (
            <line
              key={`line-${node.id}`}
              x1="50%"
              y1="50%"
              x2={`${50 + node.x}%`}
              y2={`${50 + node.y}%`}
              stroke="rgba(0,200,255,0.2)"
              strokeWidth="1"
              strokeDasharray="4"
            />
          ))}
        </svg>

        {/* Center Node (User) */}
        <motion.div
          animate={{ rotate: rotation }}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #00c8ff 0%, #0099ff 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid rgba(255,255,255,0.3)",
              boxShadow: "0 0 40px rgba(0,200,255,0.5)",
            }}
          >
            <AccountCircleIcon sx={{ fontSize: 40, color: "#fff" }} />
          </Box>
        </motion.div>

        {/* Contact Nodes */}
        {nodes.map((node) => (
          <motion.div
            key={node.id}
            animate={{
              x: node.x * zoom,
              y: node.y * zoom,
              scale: selectedNode?.id === node.id ? 1.2 : 1,
            }}
            transition={{ type: "spring", stiffness: 100 }}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              cursor: "pointer",
            }}
            onClick={() => setSelectedNode(node)}
          >
            <Box
              sx={{
                width: node.size,
                height: node.size,
                borderRadius: "50%",
                background: `radial-gradient(circle at 30% 30%, ${node.color} 0%, ${alpha(node.color, 0.3)} 100%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: `2px solid ${alpha(node.color, 0.5)}`,
                boxShadow: `0 0 20px ${alpha(node.color, 0.4)}`,
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  inset: 0,
                  background: `radial-gradient(circle at 30% 30%, ${alpha("#fff", 0.1)} 0%, transparent 70%)`,
                },
              }}
            >
              {node.contact.emergency && (
                <Box
                  sx={{
                    position: "absolute",
                    top: -4,
                    right: -4,
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    bgcolor: "#FF5252",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <BoltIcon sx={{ fontSize: 10, color: "#fff" }} />
                </Box>
              )}
              <Typography
                variant="caption"
                sx={{
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: "0.7rem",
                }}
              >
                {node.contact.relationship.slice(0, 2)}
              </Typography>
            </Box>
          </motion.div>
        ))}
        
      </Box>

      {/* Selected Node Details */}
      {selectedNode && (
        <Box
          sx={{
            mt: 3,
            p: 2.5,
            borderRadius: 3,
            background: "rgba(0,0,0,0.4)",
            border: "1px solid rgba(0,200,255,0.3)",
            backdropFilter: "blur(10px)",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <SecurityIcon sx={{ color: "#00c8ff" }} />
              <Typography
                variant="caption"
                sx={{
                  color: "#00c8ff",
                  fontWeight: 500,
                  letterSpacing: "1px",
                }}
              >
                SELECTED NODE
              </Typography>
            </Box>

            <Chip
              label={`€${selectedNode.contact.withdrawalLimit.toLocaleString()}`}
              size="small"
              sx={{
                bgcolor: alpha(selectedNode.color, 0.2),
                color: selectedNode.color,
                fontWeight: 600,
              }}
            />
          </Box>

          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            <Box>
              <Typography variant="caption" sx={{ color: "#00c8ff" }}>
                RELATIONSHIP
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#fff", fontWeight: 600 }}
              >
                {selectedNode.contact.relationship.replace("_", " ")}
              </Typography>
            </Box>

            <Box>
              <Typography variant="caption" sx={{ color: "#00c8ff" }}>
                STATUS
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#fff", fontWeight: 600 }}
              >
                {selectedNode.contact.emergency ? "EMERGENCY" : "ACTIVE"}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              mt: 2,
              pt: 2,
              borderTop: "1px solid rgba(0,200,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="caption" sx={{ color: "#00c8ff" }}>
              SINCE {new Date(selectedNode.contact.startDate).getFullYear()}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <LinkIcon sx={{ fontSize: 14, color: "#00c8ff" }} />
              <Typography variant="caption" sx={{ color: "#00c8ff" }}>
                STRENGTH: HIGH
              </Typography>
            </Box>
          </Box>
        </Box>
      )}

      {/* Network Stats */}
      <Box
        sx={{
          mt: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Typography variant="caption" sx={{ color: "#00c8ff" }}>
          TOTAL NETWORK VALUE: €{totalLimit.toLocaleString()}
        </Typography>

        <Typography variant="caption" sx={{ color: "#00c8ff" }}>
          AVG NODE: €
          {avgLimit.toLocaleString(undefined, { maximumFractionDigits: 0 })}
        </Typography>
      </Box>
    </Box>
  );
}
