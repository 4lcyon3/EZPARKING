package main

import (
	"embed"
	"log"

	"github.com/4lcyon3/ezparking/internal/uiapi"
	"github.com/wailsapp/wails/v3/pkg/application"
)

//go:embed all:frontend/dist
var assets embed.FS

const appVersion = "0.1.0"

func main() {
	app := application.New(application.Options{
		Name:        "ezparking",
		Description: "Gestión integral de estacionamientos · GeneSYS",
		Services: []application.Service{
			application.NewService(uiapi.NewAppInfoService(appVersion)),
		},
		Assets: application.AssetOptions{
			Handler: application.AssetFileServerFS(assets),
		},
		Mac: application.MacOptions{
			ApplicationShouldTerminateAfterLastWindowClosed: true,
		},
	})

	app.Window.NewWithOptions(application.WebviewWindowOptions{
		Title:            "ezparking",
		Width:            1280,
		Height:           800,
		BackgroundColour: application.NewRGB(248, 250, 252), // #F8FAFC, evita flash blanco
		URL:              "/",
	})

	if err := app.Run(); err != nil {
		log.Fatal(err)
	}
}
