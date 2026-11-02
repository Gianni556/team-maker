let toastService = null;

export function createToastService(container) {
  toastService = {
    showToast: (msg) => { container.addToast(msg) }
  };

  return toastService;
}

export function getToastService() {
  return Object.freeze(toastService);
}