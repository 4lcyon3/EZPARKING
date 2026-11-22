package uiapi

type AppInfo struct {
	Name    string `json:"name"`
	Vendor  string `json:"vendor"`
	Version string `json:"version"`
}

type AppInfoService struct{ version string }

func NewAppInfoService(version string) *AppInfoService {
	return &AppInfoService{version: version}
}

func (s *AppInfoService) Info() AppInfo {
	return AppInfo{Name: "ezparking", Vendor: "GeneSYS", Version: s.version}
}
