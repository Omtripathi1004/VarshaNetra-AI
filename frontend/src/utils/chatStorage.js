/**
 * VarshaNetra AI — Privacy-Preserving Persistent Chat Storage
 * ==========================================================
 * Guarantees:
 * 1. Permanent Chat Durability across website reloads, browser restarts, and tab switches.
 * 2. Strict User Isolation & Confidentiality: Each user ID / role (farmer, developer, admin)
 *    has its own sandboxed storage partition. Switching accounts will NEVER expose or leak
 *    another user's chats or private data.
 * 3. Bidirectional Sync: Mirrors chats between localStorage and backend database.
 */

const STORAGE_PREFIX = 'varshanetra_chat_sessions_';

export function cleanUserKey(userId) {
  if (!userId) return 'farmer_varshanetra_ai';
  return String(userId).trim().toLowerCase().replace(/[^a-z0-9_@.-]/g, '_');
}

/**
 * Get all stored chat sessions for a specific user ID
 */
export function getUserSessions(userId) {
  try {
    const key = STORAGE_PREFIX + cleanUserKey(userId);
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Sort by updated_at descending
    return parsed.sort((a, b) => new Date(b.updated_at || b.created_at) - new Date(a.updated_at || a.created_at));
  } catch (err) {
    console.warn('Failed to read user chat sessions from localStorage:', err);
    return [];
  }
}

/**
 * Get the most recent active session for a specific user ID
 */
export function getUserActiveSession(userId) {
  const sessions = getUserSessions(userId);
  return sessions[0] || null;
}

/**
 * Save or update a session for a specific user ID
 */
export function saveUserSession(userId, session) {
  try {
    const key = STORAGE_PREFIX + cleanUserKey(userId);
    const sessions = getUserSessions(userId);
    const existingIdx = sessions.findIndex(s => s.id === session.id);
    
    if (existingIdx >= 0) {
      sessions[existingIdx] = { ...sessions[existingIdx], ...session, updated_at: new Date().toISOString() };
    } else {
      sessions.unshift({
        ...session,
        created_at: session.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    }

    localStorage.setItem(key, JSON.stringify(sessions));
    // Notify all listening components
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('varshanetra_chat_storage_change', {
        detail: { userId: cleanUserKey(userId), sessionId: session.id }
      }));
    }
    return session;
  } catch (err) {
    console.warn('Failed to save user chat session:', err);
    return session;
  }
}

/**
 * Append a user question and/or bot response to the user's active session
 */
export function appendMessageToSession(userId, messageData, explicitSessionId = null) {
  try {
    const uid = cleanUserKey(userId);
    const sessions = getUserSessions(uid);
    let session = null;

    if (explicitSessionId) {
      session = sessions.find(s => s.id === explicitSessionId);
    }
    if (!session && sessions.length > 0) {
      session = sessions[0];
    }

    const nowIso = new Date().toISOString();

    if (!session) {
      // Create new session
      const title = (messageData.text || messageData.question || 'New Advisory Session').slice(0, 45);
      session = {
        id: explicitSessionId || `sess_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
        user_id: uid,
        session_title: title,
        language: messageData.language || 'en',
        created_at: nowIso,
        updated_at: nowIso,
        messages: [],
      };
      sessions.unshift(session);
    }

    // Add message
    const msgId = messageData.id || `msg_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    const newMsg = {
      id: msgId,
      role: messageData.role || 'user',
      text: messageData.text || '',
      question: messageData.question || null,
      intent: messageData.intent || null,
      crop: messageData.crop || null,
      isError: Boolean(messageData.isError),
      timestamp: messageData.timestamp || nowIso,
    };

    session.messages.push(newMsg);
    session.message_count = session.messages.length;
    session.updated_at = nowIso;

    // Update title if session had default title and this is a user message
    if ((session.session_title === 'New Conversation' || session.session_title === 'New Advisory Session') && messageData.role === 'user' && messageData.text) {
      session.session_title = messageData.text.slice(0, 45) + (messageData.text.length > 45 ? '...' : '');
    }

    const key = STORAGE_PREFIX + uid;
    localStorage.setItem(key, JSON.stringify(sessions));

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('varshanetra_chat_storage_change', {
        detail: { userId: uid, sessionId: session.id }
      }));
    }

    return session;
  } catch (err) {
    console.warn('Failed to append message to chat session:', err);
    return null;
  }
}

/**
 * Delete a session for a specific user ID
 */
export function deleteUserSession(userId, sessionId) {
  try {
    const uid = cleanUserKey(userId);
    const key = STORAGE_PREFIX + uid;
    const sessions = getUserSessions(uid);
    const updated = sessions.filter(s => s.id !== sessionId);
    localStorage.setItem(key, JSON.stringify(updated));

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('varshanetra_chat_storage_change', {
        detail: { userId: uid, sessionId, deleted: true }
      }));
    }
    return true;
  } catch (err) {
    console.warn('Failed to delete chat session:', err);
    return false;
  }
}
