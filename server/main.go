package main

import (
    "encoding/json"
    "errors"
    "log"
    "net/http"
    "net/url"
    "os"
    "path"
    "path/filepath"
    "sort"
    "strings"
)

// helper to disable caching
func noCacheHeaders(w http.ResponseWriter) {
	w.Header().Set("Cache-Control", "no-cache, no-store, must-revalidate, proxy-revalidate, max-age=0")
	w.Header().Set("Pragma", "no-cache")
	w.Header().Set("Expires", "0")
}

type siteInfo struct {
    Name  string `json:"name"`
    Entry string `json:"entry"`
}

func discoverSites(publicDir string) ([]siteInfo, error) {
    files, err := os.ReadDir(publicDir)
    if err != nil {
        return nil, err
    }

    sites := make([]siteInfo, 0, len(files))
    for _, file := range files {
        if !file.IsDir() {
            continue
        }

        name := file.Name()
        indexPath := filepath.Join(publicDir, name, "index.html")
        if _, err := os.Stat(indexPath); err != nil {
            continue
        }

        sites = append(sites, siteInfo{
            Name:  name,
            Entry: "/" + url.PathEscape(name) + "/index.html",
        })
    }

    sort.Slice(sites, func(i, j int) bool {
        return strings.ToLower(sites[i].Name) < strings.ToLower(sites[j].Name)
    })

    return sites, nil
}

func handleDirectories(publicDir string) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        if r.Method != http.MethodGet {
            http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
            return
        }

        noCacheHeaders(w)
        sites, err := discoverSites(publicDir)
        if err != nil {
            http.Error(w, "Failed to read directories", http.StatusInternalServerError)
            log.Printf("Error reading sites in %s: %v", publicDir, err)
            return
        }

        w.Header().Set("Content-Type", "application/json")
        if err := json.NewEncoder(w).Encode(sites); err != nil {
            http.Error(w, "Failed to encode response", http.StatusInternalServerError)
            log.Printf("Error encoding directories to JSON: %v", err)
        }
    }
}

func staticHandler(publicDir string) http.Handler {
    fileServer := http.FileServer(http.Dir(publicDir))

    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        if r.Method != http.MethodGet && r.Method != http.MethodHead {
            http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
            return
        }

        cleanedPath := path.Clean("/" + r.URL.Path)
        if cleanedPath == "/" {
            noCacheHeaders(w)
            http.ServeFile(w, r, filepath.Join(publicDir, "index.html"))
            return
        }

        fullPath := filepath.Join(publicDir, filepath.FromSlash(strings.TrimPrefix(cleanedPath, "/")))
        info, err := os.Stat(fullPath)
        if err != nil {
            if errors.Is(err, os.ErrNotExist) {
                http.NotFound(w, r)
                return
            }
            http.Error(w, "Failed to read resource", http.StatusInternalServerError)
            log.Printf("Error reading path %s: %v", fullPath, err)
            return
        }

        if info.IsDir() {
            indexPath := filepath.Join(fullPath, "index.html")
            if _, err := os.Stat(indexPath); errors.Is(err, os.ErrNotExist) {
                http.NotFound(w, r)
                return
            }

            if !strings.HasSuffix(r.URL.Path, "/") {
                http.Redirect(w, r, cleanedPath+"/", http.StatusMovedPermanently)
                return
            }
        }

		if strings.HasSuffix(strings.ToLower(cleanedPath), ".html") || 
		   strings.HasSuffix(strings.ToLower(cleanedPath), ".json") || 
		   info.IsDir() {
			noCacheHeaders(w)
		}

        fileServer.ServeHTTP(w, r)
    })
}

func main() {
    port := os.Getenv("PORT")
    if port == "" {
        port = "8080"
    }

    publicDir := "./public"
    mux := http.NewServeMux()
    mux.HandleFunc("/api/directories", handleDirectories(publicDir))
    mux.Handle("/", staticHandler(publicDir))

    log.Printf("Starting lightweight Go server on http://localhost:%s", port)
    if err := http.ListenAndServe(":"+port, mux); err != nil {
        log.Fatalf("Could not start server: %s\n", err)
    }
}
