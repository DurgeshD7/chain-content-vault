// Plug Wallet utility for ICP integration
import { Actor, HttpAgent } from "@dfinity/agent";
import type { ActorSubclass } from "@dfinity/agent";
// @ts-ignore
import { idlFactory } from "@/declarations/content_registry.did.js";

const CONTENT_REGISTRY_CANISTER_ID = "uxrrr-q7777-77774-qaaaq-cai";

export async function connectPlug(): Promise<{ principal?: string; connected: boolean; error?: string }> {
  if (!window.ic || !window.ic.plug) {
    return { connected: false, error: "Plug Wallet not found. Please install the extension." };
  }
  try {
    const connected = await window.ic.plug.requestConnect({
      whitelist: [CONTENT_REGISTRY_CANISTER_ID],
      host: "http://127.0.0.1:4943", // local dfx
    });
    if (!connected) return { connected: false, error: "User rejected connection." };
    const principal = await window.ic.plug.getPrincipal();
    return { principal: principal.toString(), connected: true };
  } catch (e: any) {
    return { connected: false, error: e.message || "Unknown error" };
  }
}

export function isPlugConnected(): boolean {
  return Boolean(window.ic && window.ic.plug && window.ic.plug.sessionManager?.sessionData);
}

export function createPlugActor<T = Record<string, unknown>>(): ActorSubclass<T> | null {
  if (!window.ic || !window.ic.plug) return null;
  // Use Plug's agent for authenticated calls
  return window.ic.plug.createActor({
    canisterId: CONTENT_REGISTRY_CANISTER_ID,
    interfaceFactory: idlFactory,
  }) as ActorSubclass<T>;
}

declare global {
  interface Window {
    ic?: {
      plug?: {
        requestConnect: (options: { whitelist: string[]; host?: string }) => Promise<boolean>;
        getPrincipal: () => Promise<{ toString: () => string }>;
        createActor: (options: { canisterId: string; interfaceFactory: any }) => unknown;
        sessionManager?: { sessionData?: unknown };
      };
    };
  }
} 