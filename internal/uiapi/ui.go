package uiapi

type UIService struct{ win *WindowRef }

func NewUIService(win *WindowRef) *UIService { return &UIService{win: win} }

// Ready muestra la ventana principal cuando la interfaz está lista.
func (s *UIService) Ready() {
	if w := s.win.Get(); w != nil {
		w.Show()
		w.Focus()
	}
}
