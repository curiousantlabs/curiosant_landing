import {
    LiveKitRoom,
    RoomAudioRenderer,
    ControlBar,
    useTracks,
    useTrackByName,
    useRoomContext,
    useChat,
    useConnectionState,
} from "@livekit/components-react";
import { Track, RoomEvent, ConnectionState, type TranscriptionSegment, type Participant } from "livekit-client";
import { useEffect, useState, useRef } from "react";
import { Bot, Mic, MicOff, Phone, Loader2, Send, User, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LiveKitDemo() {
    const [connectionDetails, setConnectionDetails] = useState<{
        serverUrl: string;
        token: string;
        participantName: string;
    } | undefined>(undefined);
    const [connect, setConnect] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchConnectionDetails = async () => {
        try {
            const resp = await fetch("/api/connection-details");
            if (!resp.ok) {
                const text = await resp.text();
                try {
                    const json = JSON.parse(text);
                    throw new Error(json.error || `Server error: ${resp.status}`);
                } catch (e) {
                    console.error("Fetch failed:", text);
                    throw new Error(`Connection failed (${resp.status}). Check server logs.`);
                }
            }
            const data = await resp.json();
            if (data.error) {
                throw new Error(data.error);
            }
            setConnectionDetails(data);
        } catch (e: any) {
            console.error(e);
            setError(e.message || "Could not connect to server");
        }
    };

    useEffect(() => {
        if (connect && !connectionDetails) {
            fetchConnectionDetails();
        }
    }, [connect]);

    const [showChat, setShowChat] = useState(false);

    if (error) {
        return (
            <div className="relative glass-card rounded-3xl p-6 border border-white/10 overflow-hidden h-full flex flex-col items-center justify-center text-center">
                <p className="text-red-500 mb-4">{error}</p>
                <Button variant="outline" onClick={() => { setError(null); setConnect(false); }}>
                    Try Again
                </Button>
            </div>
        );
    }

    if (!connect) {
        return (
            <div className="relative glass-card rounded-3xl p-4 sm:p-6 border border-white/10 overflow-hidden h-full flex flex-col items-center justify-center text-center">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary to-accent opacity-20 blur-3xl rounded-full" />

                <div className="relative z-10 flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent p-1 mb-6 shadow-xl shadow-primary/20">
                        <img
                            src="/vaani_avatar.png"
                            alt="Vaani Avatar"
                            className="w-full h-full rounded-full object-cover border-2 border-white/20"
                        />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Talk to Vaani</h3>
                    <p className="text-muted-foreground mb-8 max-w-[240px] sm:max-w-[280px]">
                        Experience our human-like AI agent live. Click below to start a conversation.
                    </p>
                    <Button
                        size="lg"
                        variant="glow"
                        className="h-12 px-4 sm:px-8 text-lg font-semibold w-full sm:w-auto"
                        onClick={() => setConnect(true)}
                    >
                        <Mic className="w-5 h-5 mr-2" />
                        Start Conversation
                    </Button>
                    <p className="mt-6 text-sm text-muted-foreground w-full max-w-[240px] sm:max-w-[280px]">
                        Prefer a phone call? Listen to our IVR demo at{" "}
                        <a href="tel:+17247013807" className="text-primary hover:underline font-medium">
                            +1 724 701 3807
                        </a>
                    </p>
                </div>
            </div>
        );
    }

    if (!connectionDetails) {
        return (
            <div className="relative glass-card rounded-3xl p-6 border border-white/10 overflow-hidden h-full flex flex-col items-center justify-center">
                <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
                <p className="text-muted-foreground">Connecting to Vaani...</p>
            </div>
        );
    }

    return (
        <LiveKitRoom
            token={connectionDetails.token}
            serverUrl={connectionDetails.serverUrl}
            connect={true}
            video={false}
            audio={true}
            onDisconnected={() => setConnect(false)}
            className="relative glass-card rounded-3xl border border-white/10 overflow-hidden h-full flex flex-col"
        >
            <div className="flex-1 flex flex-col items-center justify-center relative p-4 sm:p-6">
                {/* Visualizer and Agent Status */}
                <RoomAudioRenderer />

                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-8 relative p-1">
                    <div className="absolute inset-0 rounded-full border border-primary/30 animate-pulse" />
                    <img
                        src="/vaani_avatar.png"
                        alt="Vaani Avatar"
                        className="w-full h-full rounded-full object-cover border-4 border-background shadow-2xl relative z-10"
                    />
                    <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-green-500 border-2 border-background shadow-lg z-20" />
                </div>

                <div className="w-full max-w-[200px] h-12 mb-8">
                    <SimpleVoiceVisualizer />
                </div>

                <AgentStatus />

                <div className="flex justify-center gap-4 mt-auto pt-6 border-t border-white/5 w-full z-20">
                    <CustomControlBar
                        onDisconnect={() => setConnect(false)}
                        onChatToggle={() => setShowChat(!showChat)}
                        showChat={showChat}
                    />
                </div>
            </div>

            {/* Chat Overlay */}
            {showChat && (
                <div className="absolute inset-0 w-full bg-black/60 backdrop-blur-sm z-10 transition-all">
                    <ChatSection />
                </div>
            )}
        </LiveKitRoom>
    );
}

function ChatSection() {
    const { chatMessages, send, isSending } = useChat();
    const room = useRoomContext();
    const [message, setMessage] = useState("");
    const [transcripts, setTranscripts] = useState<Map<string, { message: string, timestamp: number, from?: Participant }>>(new Map());

    const handleSend = async () => {
        if (!message.trim()) return;
        await send(message);
        setMessage("");
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    // Debug logging for Chat Messages
    useEffect(() => {
        if (chatMessages.length > 0) {
            console.log("Chat Messages Update:", chatMessages);
        }
    }, [chatMessages]);

    // Listen for data packets to debug
    useEffect(() => {
        if (!room) return;
        const onData = (payload: Uint8Array, participant?: Participant, kind?: any, topic?: string) => {
            try {
                const str = new TextDecoder().decode(payload);
                console.log("Data Packet Received:", { str, topic, kind, participantIdent: participant?.identity });
            } catch (e) {
                console.log("Received non-text data packet");
            }
        };
        room.on(RoomEvent.DataReceived, onData);
        return () => {
            room.off(RoomEvent.DataReceived, onData);
        };
    }, [room]);

    // Listen for transcriptions
    useEffect(() => {
        if (!room) return;

        const onTranscription = (segments: TranscriptionSegment[], participant?: Participant) => {
            if (!participant) return;
            console.log("Transcription Received:", { segments, participant: participant.identity });

            setTranscripts(prev => {
                const newTranscripts = new Map(prev);
                for (const seg of segments) {
                    if (seg.final) {
                        newTranscripts.set(seg.id, {
                            message: seg.text,
                            timestamp: seg.firstReceivedTime,
                            from: participant
                        });
                    }
                }
                return newTranscripts;
            });
        };

        room.on(RoomEvent.TranscriptionReceived, onTranscription);
        return () => {
            room.off(RoomEvent.TranscriptionReceived, onTranscription);
        };
    }, [room]);

    // Merge and sort messages
    const messages = [
        ...chatMessages,
        ...Array.from(transcripts.values())
    ].sort((a, b) => a.timestamp - b.timestamp);

    // Auto-scroll to bottom
    const chatContainerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [messages]);

    return (
        <div className="flex flex-col h-full pb-28">
            <div className="flex items-center p-4 border-b border-white/5 bg-white/5">
                <h3 className="font-semibold text-sm">Transcript & Chat</h3>
            </div>

            <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-4 space-y-4"
            >
                {messages.length === 0 ? (
                    <div className="text-center text-muted-foreground text-sm mt-10">
                        <p>Conversation started...</p>
                        <p className="text-xs opacity-70 mt-1">Speak or type to interact with Vaani</p>
                    </div>
                ) : (
                    messages.map((msg, idx) => {
                        const isAgent = msg.from?.isAgent ||
                            msg.from?.identity?.toLowerCase().includes("agent") ||
                            msg.from?.name?.toLowerCase().includes("vaani");
                        const isUser = !isAgent;

                        return (
                            <div key={msg.timestamp + idx} className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden ${isUser ? "bg-primary/20" : "bg-white/10"}`}>
                                    {isUser ? <User className="w-4 h-4 text-primary" /> : (
                                        <img
                                            src="/vaani_avatar.png"
                                            alt="Vaani"
                                            className="w-full h-full object-cover"
                                        />
                                    )}
                                </div>
                                <div className={`rounded-2xl p-3 text-sm max-w-[85%] ${isUser
                                    ? "bg-primary/10 border border-primary/20 text-white rounded-tr-none"
                                    : "bg-white/5 border border-white/10 text-muted-foreground rounded-tl-none"
                                    }`}>
                                    <p>{msg.message}</p>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            <div className="p-4 border-t border-white/5 bg-white/5">
                <div className="relative">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type a message..."
                        className="w-full bg-black/40 border border-white/10 rounded-full px-4 py-3 text-sm focus:outline-none focus:border-primary/50 pr-12"
                        disabled={isSending}
                    />
                    <Button
                        size="icon"
                        variant="ghost"
                        className="absolute right-1 top-1 h-8 w-8 hover:bg-primary/20 hover:text-primary rounded-full transition-colors"
                        onClick={handleSend}
                        disabled={!message.trim() || isSending}
                    >
                        <Send className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

function SimpleVoiceVisualizer() {
    return (
        <div className="flex items-center justify-center gap-1 h-full">
            {[...Array(5)].map((_, i) => (
                <div
                    key={i}
                    className="w-2 bg-primary/50 rounded-full animate-pulse"
                    style={{
                        height: '40%',
                        animationDelay: `${i * 0.1}s`,
                        animationDuration: '0.8s'
                    }}
                />
            ))}
        </div>
    );
}

function CustomControlBar({ onDisconnect, onChatToggle, showChat }: { onDisconnect: () => void, onChatToggle: () => void, showChat: boolean }) {
    const [muted, setMuted] = useState(false);
    const { localParticipant } = useRoomContext();

    const toggleMute = () => {
        const newState = !muted;
        setMuted(newState);
        if (localParticipant) {
            localParticipant.setMicrophoneEnabled(!newState);
        }
    };

    return (
        <div className="flex items-center gap-4">
            <Button
                variant="outline"
                size="icon"
                className={`rounded-full h-12 w-12 border-white/10 ${muted ? 'bg-red-500/20 text-red-500' : 'bg-white/5 hover:bg-white/10'}`}
                onClick={toggleMute}
            >
                {muted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </Button>

            <Button
                variant="destructive"
                size="icon"
                className="rounded-full h-14 w-14 shadow-lg shadow-red-500/20"
                onClick={onDisconnect}
            >
                <Phone className="w-6 h-6" />
            </Button>

            <Button
                variant="outline"
                size="icon"
                className={`rounded-full h-12 w-12 border-white/10 ${showChat ? 'bg-primary/20 text-primary' : 'bg-white/5 hover:bg-white/10'}`}
                onClick={onChatToggle}
            >
                <MessageSquare className="w-5 h-5" />
            </Button>
        </div>
    );
}

function AgentStatus() {
    const connectionState = useConnectionState();
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        if (connectionState === ConnectionState.Connected) {
            const interval = setInterval(() => {
                setDuration(prev => prev + 1);
            }, 1000);
            return () => clearInterval(interval);
        } else {
            setDuration(0);
        }
    }, [connectionState]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    if (connectionState === ConnectionState.Connecting) {
        return (
            <div className="flex items-center gap-2 mb-2 animate-pulse">
                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                <p className="text-sm text-yellow-500 font-medium">Connecting...</p>
            </div>
        );
    }

    if (connectionState === ConnectionState.Connected) {
        return (
            <div className="flex flex-col items-center gap-1 mb-2">
                <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <p className="text-sm text-green-500 font-medium">Live</p>
                </div>
                <p className="text-xs text-muted-foreground font-mono">{formatTime(duration)}</p>
            </div>
        );
    }

    return <p className="text-sm text-muted-foreground mb-2">Ready</p>;
}
