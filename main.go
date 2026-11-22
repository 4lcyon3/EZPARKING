package main

import (
	"embed"
	"log"
	"time"

	"github.com/4lcyon3/ezparking/internal/uiapi"
	"github.com/wailsapp/wails/v3/pkg/application"
)

//go:embed all:frontend/dist
var assets embed.FS

const (
	appVersion = "0.1.0"
	appID      = "com.genesys.ezparking"
)

func main() {
	winRef := &uiapi.WindowRef{}

	bringToFront := func() {
		w := winRef.Get()
		if w == nil {
			return
		}
		if w.IsMinimised() {
			w.UnMinimise()
		}
		w.Show()
		w.Focus()
	}

	app := application.New(application.Options{
		Name:        "ezparking",
		Description: "Gestión integral de estacionamientos · GeneSYS",
		Services: []application.Service{
			application.NewService(uiapi.NewAppInfoService(appVersion)),
			application.NewService(uiapi.NewUIService(winRef)),
		},
		Assets: application.AssetOptions{Handler: application.AssetFileServerFS(assets)},
		Flags:  map[string]any{"appVersion": appVersion, "vendor": "GeneSYS"},
		SingleInstance: &application.SingleInstanceOptions{
			UniqueID:               appID,
			OnSecondInstanceLaunch: func(_ application.SecondInstanceData) { bringToFront() },
		},
		Mac: application.MacOptions{
			ApplicationShouldTerminateAfterLastWindowClosed: true,
		},
	})

	win := app.Window.NewWithOptions(application.WebviewWindowOptions{
		Name:             "main",
		Title:            "ezparking",
		Width:            1280,
		Height:           800,
		MinWidth:         1024,
		MinHeight:        640,
		InitialPosition:  application.WindowCentered,
		BackgroundColour: application.NewRGB(248, 250, 252),
		Hidden:           true, // la muestra UIService.Ready()
		URL:              "/",
	})
	winRef.Set(win)

	// Red de seguridad: si el frontend fallara, la ventana no queda oculta para siempre.
	go func() {
		time.Sleep(5 * time.Second)
		if w := winRef.Get(); w != nil && !w.IsVisible() {
			w.Show()
		}
	}()

	if err := app.Run(); err != nil {
		log.Fatal(err)
	}
}
