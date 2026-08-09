import React, { useEffect, useRef, useState } from "react";
import { Box, Card, Chip, IconButton, Skeleton, TextField, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import PersonIcon from "@mui/icons-material/Person";
import axios from "axios";
import PageHeader from "../../components/ui/PageHeader";
import AiChart from "../../components/charts/AiChart";

const Assistant = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi! Ask me anything about your employees and payroll. Try one of the suggestions below, or type your own question.",
    },
  ]);
  const [suggestions, setSuggestions] = useState([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    axios
      .get("/ai/suggest")
      .then((res) => setSuggestions(res.data || []))
      .catch(() => setSuggestions([]));
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking]);

  const ask = async (question) => {
    const text = (question || "").trim();
    if (!text || thinking) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text }]);
    setThinking(true);
    try {
      const res = await axios.post("/ai/ask", { question: text });
      setMessages((m) => [...m, { role: "assistant", text: res.data.answer, series: res.data.series }]);
    } catch {
      setMessages((m) => [...m, { role: "assistant", text: "Sorry, something went wrong while answering. Try again." }]);
    } finally {
      setThinking(false);
    }
  };

  return (
    <Box>
      <PageHeader title="AI Assistant" subtitle="Ask natural-language questions about your HR data" />

      <Card sx={{ maxWidth: 860, mx: "auto" }}>
        <Box sx={{ height: 480, overflowY: "auto", px: 3, py: 2.5, display: "flex", flexDirection: "column", gap: 2 }}>
          {messages.map((msg, i) => (
            <Box key={i} sx={{ display: "flex", gap: 1.25, justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
              {msg.role === "assistant" ? (
                <Box sx={{ width: 32, height: 32, borderRadius: "50%", bgcolor: "var(--primary-soft)", color: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <SmartToyIcon fontSize="small" />
                </Box>
              ) : null}
              <Box
                sx={{
                  maxWidth: "80%",
                  px: 2,
                  py: 1.25,
                  borderRadius: 2.5,
                  bgcolor: msg.role === "user" ? "var(--primary)" : "var(--surface-muted)",
                  color: msg.role === "user" ? "#fff" : "text.primary",
                  whiteSpace: "pre-wrap",
                }}
              >
                <Typography variant="body2">{msg.text}</Typography>
                {msg.series ? (
                  <Box sx={{ mt: 1.5 }}>
                    <AiChart series={msg.series} />
                  </Box>
                ) : null}
              </Box>
              {msg.role === "user" ? (
                <Box sx={{ width: 32, height: 32, borderRadius: "50%", bgcolor: "var(--accent-soft)", color: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <PersonIcon fontSize="small" />
                </Box>
              ) : null}
            </Box>
          ))}
          {thinking ? (
            <Box sx={{ display: "flex", gap: 1.25 }}>
              <Box sx={{ width: 32, height: 32, borderRadius: "50%", bgcolor: "var(--primary-soft)", color: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <SmartToyIcon fontSize="small" />
              </Box>
              <Box sx={{ px: 2, py: 1.25, borderRadius: 2.5, bgcolor: "var(--surface-muted)" }}>
                <Skeleton width={140} />
              </Box>
            </Box>
          ) : null}
          <div ref={endRef} />
        </Box>

        {suggestions.length ? (
          <Box sx={{ px: 3, pb: 1.5, display: "flex", gap: 1, flexWrap: "wrap" }}>
            {suggestions.map((s) => (
              <Chip key={s} label={s} size="small" clickable onClick={() => ask(s)} sx={{ color: "var(--primary)", borderColor: "var(--primary)" }} variant="outlined" />
            ))}
          </Box>
        ) : null}

        <Box sx={{ px: 3, pb: 3, display: "flex", gap: 1.5 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Ask about employees or payroll..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && ask(input)}
          />
          <IconButton color="primary" onClick={() => ask(input)} disabled={thinking || !input.trim()} aria-label="Send question">
            <SendIcon />
          </IconButton>
        </Box>
      </Card>
    </Box>
  );
};

export default Assistant;
