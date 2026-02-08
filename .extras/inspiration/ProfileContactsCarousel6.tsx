/**
 * @file ProfileContactsCarousel.tsx
 * @description Futuristic network visualization with interactive nodes (pan/zoom like a map)
 */

"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  Chip,
  IconButton,
  alpha,
  useTheme,
  Tooltip,
} from "@mui/material";
import { motion } from "framer-motion";

import type { User } from "@/types/user/user.type";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HubIcon from "@mui/icons-material/Hub";
import BoltIcon from "@mui/icons-material/Bolt";
import SecurityIcon from "@mui/icons-material/Security";
import LinkIcon from "@mui/icons-material/Link";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

type Props = {
  user: User;
};

type Contact = User["contacts"][number];

type Node = {
  id: string;
  contact: Contact;
  x: number; // px in graph-space (center = 0,0)
  y: number; // px in graph-space (center = 0,0)
  size: number;
  color: string;
};

const MotionBox = motion(Box);

export default function ProfileContactsCarousel({ user }: Props) {
  const theme = useTheme();

  const contacts: Contact[] = user?.contacts ?? [];
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  // View controls
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  // Pan in screen space (px)
  const [pan, setPan] = useState({ x: 0, y: 0 });

  // ---------- Node generation (stable & memoized)
  const nodes: Node[] = useMemo(() => {
    const n = contacts.length;
    if (!n) return [];

    // Make spacing feel better when many nodes exist
    const baseDistance = 120;
    const distance = Math.min(200, Math.max(baseDistance, 90 + n * 6));

    return contacts.map((contact, index) => {
      const angle = (index * 2 * Math.PI) / n;

      return {
        id: contact.id,
        contact,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        size: contact.emergency ? 60 : 50,
        color: getNodeColor(contact),
      };
    });
  }, [contacts]);

  // Pick initial selection
  useEffect(() => {
    if (nodes.length > 0 && !selectedNode) {
      setSelectedNode(nodes[0]);
    }
  }, [nodes, selectedNode]);

  // Keep selected node valid if contacts change
  useEffect(() => {
    if (!selectedNode) return;
    const stillExists = nodes.some((n) => n.id === selectedNode.id);
    if (!stillExists) setSelectedNode(nodes[0] ?? null);
  }, [nodes, selectedNode]);

  // ---------- Empty state
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

  // ---------- Stats
  const totalLimit = contacts.reduce(
    (sum, c) => sum + (c.withdrawalLimit ?? 0),
    0,
  );
  const avgLimit = totalLimit / contacts.length;

  // ---------- View helpers
  function clampZoom(next: number) {
    return Math.min(2, Math.max(0.5, Number(next.toFixed(2))));
  }

  function resetView() {
    setPan({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
  }

  // Wheel zoom (maps-like)
  function onWheelZoom(e: React.WheelEvent) {
    // Trackpad/mouse wheel: zoom in/out
    // (We keep it simple: no "zoom to cursor".)
    e.preventDefault();
    const dir = e.deltaY > 0 ? -1 : 1;
    const step = 0.08;
    setZoom((z) => clampZoom(z + dir * step));
  }

  // Graph-space radius (for SVG viewBox)
  const graphRadius = useMemo(() => {
    const maxDist = Math.max(
      220,
      ...nodes.map((n) => Math.hypot(n.x, n.y) + n.size),
    );
    // Add a bit of padding
    return Math.ceil(maxDist + 40);
  }, [nodes]);

  // Rotation applied to the entire graph (optional but “map-like”)
  const graphRotateDeg = rotation;

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
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(0,200,255,0.05) 0%, transparent 70%)",
          zIndex: 0,
        }}
      />

      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
          position: "relative",
          zIndex: 2,
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
          <Tooltip title="Zoom out" arrow>
            <IconButton
              size="small"
              onClick={() => setZoom((z) => clampZoom(z - 0.1))}
              sx={{ color: "#00c8ff" }}
            >
              <ZoomOutIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Zoom in" arrow>
            <IconButton
              size="small"
              onClick={() => setZoom((z) => clampZoom(z + 0.1))}
              sx={{ color: "#00c8ff" }}
            >
              <ZoomInIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Rotate" arrow>
            <IconButton
              size="small"
              onClick={() => setRotation((r) => r + 30)}
              sx={{ color: "#00c8ff" }}
            >
              <RotateLeftIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Reset view" arrow>
            <IconButton
              size="small"
              onClick={resetView}
              sx={{ color: "#00c8ff" }}
            >
              <RestartAltIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Network Visualization (pan/zoom container) */}
      <Box
        onWheel={onWheelZoom}
        sx={{
          flex: 1,
          position: "relative",
          zIndex: 1,
          overflow: "hidden",
          borderRadius: 3,
        }}
      >
        {/* Drag layer */}
        <motion.div
          drag
          dragMomentum={false}
          onDrag={(_, info) => {
            setPan((p) => ({ x: p.x + info.delta.x, y: p.y + info.delta.y }));
          }}
          style={{
            position: "absolute",
            inset: 0,
            touchAction: "none",
          }}
        >
          {/* Viewport transform: translate to center + pan, then zoom, then rotate graph */}
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: "100%",
              height: "100%",
              transform: `translate(calc(-50% + ${pan.x}px), calc(-50% + ${pan.y}px)) scale(${zoom}) rotate(${graphRotateDeg}deg)`,
              transformOrigin: "center",
            }}
          >
            {/* Lines (SVG in graph-space centered at 0,0) */}
            <svg
              width="100%"
              height="100%"
              viewBox={`${-graphRadius} ${-graphRadius} ${graphRadius * 2} ${
                graphRadius * 2
              }`}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              {nodes.map((node) => (
                <line
                  key={`line-${node.id}`}
                  x1={0}
                  y1={0}
                  x2={node.x}
                  y2={node.y}
                  stroke="rgba(0,200,255,0.2)"
                  strokeWidth={1}
                  strokeDasharray="4"
                />
              ))}
            </svg>

            {/* Center Node (User) */}
            <Box
              sx={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
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

            {/* Contact Nodes */}
            {nodes.map((node) => (
              <motion.div
                key={node.id}
                animate={{
                  x: node.x,
                  y: node.y,
                  scale: selectedNode?.id === node.id ? 1.18 : 1,
                }}
                transition={{ type: "spring", stiffness: 120, damping: 18 }}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  cursor: "pointer",
                }}
                onClick={() => setSelectedNode(node)}
              >
                <Box
                  sx={{
                    width: node.size,
                    height: node.size,
                    borderRadius: "50%",
                    background: `radial-gradient(circle at 30% 30%, ${node.color} 0%, ${alpha(
                      node.color,
                      0.3,
                    )} 100%)`,
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
                      background: `radial-gradient(circle at 30% 30%, ${alpha(
                        "#fff",
                        0.1,
                      )} 0%, transparent 70%)`,
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
                      fontWeight: 700,
                      fontSize: "0.7rem",
                      letterSpacing: "0.5px",
                      userSelect: "none",
                    }}
                  >
                    {String(node.contact.relationship ?? "")
                      .slice(0, 2)
                      .toUpperCase()}
                  </Typography>
                </Box>
              </motion.div>
            ))}
          </Box>
        </motion.div>
      </Box>

      {/* Selected Node Details */}
      {selectedNode && (
        <MotionBox
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          sx={{
            mt: 2,
            p: 2.5,
            borderRadius: 3,
            background: "rgba(0,0,0,0.4)",
            border: "1px solid rgba(0,200,255,0.3)",
            backdropFilter: "blur(10px)",
            position: "relative",
            zIndex: 2,
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
              label={`€${Number(selectedNode.contact.withdrawalLimit ?? 0).toLocaleString()}`}
              size="small"
              sx={{
                bgcolor: alpha(selectedNode.color, 0.2),
                color: selectedNode.color,
                fontWeight: 700,
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
                sx={{ color: "#fff", fontWeight: 700 }}
              >
                {String(selectedNode.contact.relationship ?? "—").replaceAll(
                  "_",
                  " ",
                )}
              </Typography>
            </Box>

            <Box>
              <Typography variant="caption" sx={{ color: "#00c8ff" }}>
                STATUS
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#fff", fontWeight: 700 }}
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
              SINCE{" "}
              {selectedNode.contact.startDate
                ? new Date(selectedNode.contact.startDate).getFullYear()
                : "—"}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <LinkIcon sx={{ fontSize: 14, color: "#00c8ff" }} />
              <Typography variant="caption" sx={{ color: "#00c8ff" }}>
                STRENGTH: HIGH
              </Typography>
            </Box>
          </Box>
        </MotionBox>
      )}

      {/* Network Stats */}
      <Box
        sx={{
          mt: 1.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
          zIndex: 2,
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

/* ------------------------------------------------------------ */
/* Helpers                                                      */
/* ------------------------------------------------------------ */

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
