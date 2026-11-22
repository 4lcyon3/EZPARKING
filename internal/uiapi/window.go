package uiapi

import (
	"sync"

	"github.com/wailsapp/wails/v3/pkg/application"
)

type WindowRef struct {
	mu sync.RWMutex
	w  application.Window
}

func (r *WindowRef) Set(w application.Window) {
	r.mu.Lock()
	defer r.mu.Unlock()
	r.w = w
}

func (r *WindowRef) Get() application.Window {
	r.mu.RLock()
	defer r.mu.RUnlock()
	return r.w
}
