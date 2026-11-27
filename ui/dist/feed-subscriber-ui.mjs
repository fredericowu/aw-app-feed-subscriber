function R(e) {
  const { useState: v, useEffect: x, useCallback: i } = e.React, k = () => ({
    id: `feed-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    name: "",
    source_url: "",
    poll_interval_seconds: 60,
    call_type: "webhook",
    webhook_url: "",
    auth_token: "",
    agent_slug: "",
    target_slug: "w-feed-subscriber",
    _isNew: !0
  });
  function y() {
    const [r, c] = v(null), [o, d] = v([]), [u, t] = v(""), [h, f] = v(""), g = i((a) => {
      f(a), setTimeout(() => f(""), 3e3);
    }, []), p = i(async () => {
      const l = await (await e.sdk.api.fetch(e.app.apiUrl("/cards"))).json();
      c((l.cards || []).map((n) => ({ ...n, auth_token: "" })));
    }, []);
    x(() => {
      p();
    }, [p]), x(() => {
      e.sdk.api.fetch(e.app.apiUrl("/agents")).then((a) => a.json()).then((a) => {
        d(a.agents || []), t(a.error || "");
      }).catch((a) => {
        d([]), t(String(a && a.message || a));
      });
    }, []);
    const w = i((a, l, n) => {
      c((b) => b.map((s) => s.id === a ? { ...s, [l]: l === "poll_interval_seconds" ? Number(n) || 0 : n } : s));
    }, []), N = i(() => c((a) => [...a, k()]), []), C = i(async (a) => {
      const { _isNew: l, has_auth_token: n, ...b } = a;
      b.auth_token || delete b.auth_token;
      try {
        const s = await e.sdk.api.fetch(
          e.app.apiUrl(l ? "/cards" : `/cards/${encodeURIComponent(a.id)}`),
          {
            method: l ? "POST" : "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(b)
          }
        );
        if (!s.ok) {
          const A = await s.json().catch(() => ({}));
          g(A.detail || `Save failed (${s.status})`);
          return;
        }
        g("Saved"), await p();
      } catch (s) {
        g(s.message || "Save failed");
      }
    }, [p, g]), S = i(async (a) => {
      if (a._isNew) {
        c((l) => l.filter((n) => n.id !== a.id));
        return;
      }
      await e.sdk.api.fetch(e.app.apiUrl(`/cards/${encodeURIComponent(a.id)}`), { method: "DELETE" }), await p();
    }, [p]);
    return r === null ? /* @__PURE__ */ e.h("div", { className: "p-6 text-[var(--color-text-muted)]" }, "Loading...") : /* @__PURE__ */ e.h("div", { className: "p-6 max-w-3xl h-full overflow-y-auto" }, /* @__PURE__ */ e.h("div", { className: "flex items-center justify-between mb-4" }, /* @__PURE__ */ e.h("div", null, /* @__PURE__ */ e.h("h2", { className: "text-lg font-semibold text-[var(--color-text-primary)]" }, "Feed Subscriber"), /* @__PURE__ */ e.h("p", { className: "text-xs text-[var(--color-text-muted)] mt-1" }, "Each card polls a JSON source URL on its own interval. When the response changes since the last poll, it fires a Webhook Call or an Agent Call with the new entry.")), /* @__PURE__ */ e.h("div", { className: "flex items-center gap-3" }, h && /* @__PURE__ */ e.h("span", { className: "text-xs text-[var(--color-text-muted)]" }, h), /* @__PURE__ */ e.h(
      "button",
      {
        onClick: N,
        className: "px-3 py-1.5 text-xs rounded border border-[var(--color-border)] text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)] transition-colors"
      },
      "+ Add feed"
    ))), u && /* @__PURE__ */ e.h("div", { role: "alert", className: "mb-4 text-xs rounded border border-[var(--color-border)] px-3 py-2 text-[var(--color-danger)]" }, "Could not load agents for Agent Call cards: ", u, ". Check the Agents Platform base URL and token in Settings > Apps > Feed Subscriber."), r.length === 0 && /* @__PURE__ */ e.h("div", { className: "text-xs text-[var(--color-text-muted)] italic" }, 'No feed subscriptions yet — click "+ Add feed" to create one.'), /* @__PURE__ */ e.h("div", { className: "space-y-4" }, r.map((a) => /* @__PURE__ */ e.h(
      _,
      {
        key: a.id,
        card: a,
        agents: o,
        onChange: (l, n) => w(a.id, l, n),
        onSave: () => C(a),
        onRemove: () => S(a)
      }
    ))));
  }
  function _({ card: r, agents: c, onChange: o, onSave: d, onRemove: u }) {
    return /* @__PURE__ */ e.h("div", { className: "bg-[var(--color-bg-secondary)] rounded-lg border border-[var(--color-border)] p-4 space-y-3" }, /* @__PURE__ */ e.h("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ e.h(
      "input",
      {
        value: r.name,
        onChange: (t) => o("name", t.target.value),
        placeholder: "Feed name",
        className: "text-sm font-medium bg-transparent text-[var(--color-text-primary)] border-b border-transparent hover:border-[var(--color-border)] focus:border-[var(--color-accent)] outline-none px-1"
      }
    ), /* @__PURE__ */ e.h("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ e.h(
      "button",
      {
        onClick: d,
        className: "text-xs px-2 py-1 rounded bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] transition-colors"
      },
      "Save"
    ), /* @__PURE__ */ e.h(
      "button",
      {
        onClick: u,
        className: "text-xs text-[var(--color-text-muted)] hover:text-red-400 transition-colors"
      },
      "Remove"
    ))), /* @__PURE__ */ e.h(
      m,
      {
        label: "Source JSON URL",
        value: r.source_url,
        onChange: (t) => o("source_url", t),
        placeholder: "https://example.com/feed.json"
      }
    ), /* @__PURE__ */ e.h(
      m,
      {
        label: "Poll Interval (seconds)",
        value: r.poll_interval_seconds,
        onChange: (t) => o("poll_interval_seconds", t),
        type: "number",
        placeholder: "60"
      }
    ), /* @__PURE__ */ e.h("label", { className: "block" }, /* @__PURE__ */ e.h("span", { className: "text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]" }, "Call type"), /* @__PURE__ */ e.h(
      "select",
      {
        value: r.call_type,
        onChange: (t) => o("call_type", t.target.value),
        className: "mt-0.5 w-full bg-[var(--color-bg-primary)] text-sm text-[var(--color-text-primary)] border border-[var(--color-border)] rounded px-2 py-1.5 outline-none focus:border-[var(--color-accent)] transition-colors"
      },
      /* @__PURE__ */ e.h("option", { value: "webhook" }, "Webhook Call"),
      /* @__PURE__ */ e.h("option", { value: "agent" }, "Agent Call")
    )), r.call_type === "agent" ? /* @__PURE__ */ e.h(e.React.Fragment, null, /* @__PURE__ */ e.h("label", { className: "block" }, /* @__PURE__ */ e.h("span", { className: "text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]" }, "Agent"), /* @__PURE__ */ e.h(
      "select",
      {
        value: r.agent_slug,
        onChange: (t) => o("agent_slug", t.target.value),
        className: "mt-0.5 w-full bg-[var(--color-bg-primary)] text-sm text-[var(--color-text-primary)] border border-[var(--color-border)] rounded px-2 py-1.5 outline-none focus:border-[var(--color-accent)] transition-colors"
      },
      /* @__PURE__ */ e.h("option", { value: "" }, "Select an agent…"),
      c.map((t) => /* @__PURE__ */ e.h("option", { key: t.slug, value: t.slug }, t.name || t.slug))
    )), /* @__PURE__ */ e.h(
      m,
      {
        label: "Target slug",
        value: r.target_slug,
        onChange: (t) => o("target_slug", t),
        placeholder: "w-feed-subscriber"
      }
    )) : /* @__PURE__ */ e.h(e.React.Fragment, null, /* @__PURE__ */ e.h(
      m,
      {
        label: "Target Webhook URL",
        value: r.webhook_url,
        onChange: (t) => o("webhook_url", t),
        placeholder: "https://agents-platform.internal/api/webhooks/..."
      }
    ), /* @__PURE__ */ e.h(
      m,
      {
        label: r.has_auth_token ? "Auth Token (Bearer) — set, leave blank to keep" : "Auth Token (Bearer)",
        value: r.auth_token,
        onChange: (t) => o("auth_token", t),
        type: "password",
        placeholder: "token used as Authorization: Bearer <token>"
      }
    )));
  }
  function m({ label: r, value: c, onChange: o, type: d = "text", placeholder: u }) {
    return /* @__PURE__ */ e.h("label", { className: "block" }, /* @__PURE__ */ e.h("span", { className: "text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]" }, r), /* @__PURE__ */ e.h(
      "input",
      {
        type: d,
        value: c,
        onChange: (t) => o(t.target.value),
        placeholder: u,
        className: "mt-0.5 w-full bg-[var(--color-bg-primary)] text-sm text-[var(--color-text-primary)] border border-[var(--color-border)] rounded px-2 py-1.5 outline-none focus:border-[var(--color-accent)] transition-colors"
      }
    ));
  }
  e.registerWindow("feed-subscriber.main", y);
}
export {
  R as default,
  R as register
};
