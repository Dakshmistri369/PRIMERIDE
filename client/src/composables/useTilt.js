import { onMounted, onUnmounted } from 'vue';

/**
 * useTilt — attaches a smooth 3D perspective tilt to an element or array of elements.
 * @param {Ref | Ref[]} elRefs  - a single ref or array of refs to DOM elements
 * @param {Object}      opts    - { maxTilt: number (deg), scale: number, perspective: number }
 */
export function useTilt(elRefs, opts = {}) {
  const {
    maxTilt    = 12,
    scale      = 1.04,
    perspective = 900,
    speed      = 0.12,
  } = opts;

  const refs = Array.isArray(elRefs) ? elRefs : [elRefs];
  const state = new WeakMap(); // el → { tx, ty, cx, cy, rafId }

  function lerp(a, b, t) { return a + (b - a) * t; }

  function attachEl(el) {
    if (!el) return;
    el.style.willChange = 'transform';
    el.style.transition = 'box-shadow 0.25s ease';
    const s = { tx: 0, ty: 0, cx: 0, cy: 0, rafId: null, active: false };
    state.set(el, s);

    function animate() {
      s.cx = lerp(s.cx, s.tx, speed);
      s.cy = lerp(s.cy, s.ty, speed);
      el.style.transform = `
        perspective(${perspective}px)
        rotateX(${s.cy}deg)
        rotateY(${s.cx}deg)
        scale(${s.active ? scale : 1})
      `;
      if (s.active || Math.abs(s.cx) > 0.01 || Math.abs(s.cy) > 0.01) {
        s.rafId = requestAnimationFrame(animate);
      }
    }

    function onMove(e) {
      const rect = el.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const px = (mx / rect.width  - 0.5) * 2; // -1 to 1
      const py = (my / rect.height - 0.5) * 2;
      s.tx = px * maxTilt;
      s.ty = -py * maxTilt;
    }

    function onEnter() {
      s.active = true;
      el.style.boxShadow = '0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(255,255,255,0.06)';
      cancelAnimationFrame(s.rafId);
      s.rafId = requestAnimationFrame(animate);
    }

    function onLeave() {
      s.active = false;
      s.tx = 0;
      s.ty = 0;
      el.style.boxShadow = '';
      if (!s.rafId) s.rafId = requestAnimationFrame(animate);
    }

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);

    s.cleanup = () => {
      cancelAnimationFrame(s.rafId);
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      el.style.transform = '';
      el.style.willChange = '';
    };
  }

  onMounted(() => {
    refs.forEach(r => {
      const el = r?.value;
      if (!el) return;
      if (el instanceof NodeList || Array.isArray(el)) {
        el.forEach(e => attachEl(e));
      } else {
        attachEl(el);
      }
    });
  });

  onUnmounted(() => {
    refs.forEach(r => {
      const el = r?.value;
      if (!el) return;
      const s = state.get(el);
      s?.cleanup?.();
    });
  });
}
