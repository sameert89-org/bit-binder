package main

import (
    "encoding/json"
    "log"
    "net/http"
    "os"
    "path/filepath"
)

// helper to disable caching
func noCacheHeaders(w http.ResponseWriter) {
    w.Header().Set("Cache-Control", "no-cache, no-store, must-revalidate")
    w.Header().Set("Pragma", "no-cache")
    w.Header().Set("Expires", "0")
}

func handleDirectories(publicDir string) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        noCacheHeaders(w) // don't cache the directory list

        files, err := os.ReadDir(publicDir)
        if err != nil {
            http.Error(w, "Failed to read directories", http.StatusInternalServerError)
            log.Printf("Error reading directory %s: %v", publicDir, err)
            return
        }

        var directories []string
        for _, file := range files {
            if file.IsDir() {
                directories = append(directories, file.Name())
            }
        }

        w.Header().Set("Content-Type", "application/json")
        if err := json.NewEncoder(w).Encode(directories); err != nil {
            http.Error(w, "Failed to encode response", http.StatusInternalServerError)
            log.Printf("Error encoding directories to JSON: %v", err)
        }
    }
}

func spaHandler(staticPath, indexPath string) http.HandlerFunc {
    fs := http.FileServer(http.Dir(staticPath))

    return func(w http.ResponseWriter, r *http.Request) {
        // disable caching for all SPA responses
        noCacheHeaders(w)

        path := filepath.Join(staticPath, r.URL.Path)
        _, err := os.Stat(path)

        if os.IsNotExist(err) {
            // fallback to index.html for SPA routes
            http.ServeFile(w, r, filepath.Join(staticPath, indexPath))
            return
        } else if err != nil {
            http.Error(w, err.Error(), http.StatusInternalServerError)
            return
        }

        // serve actual static file
        fs.ServeHTTP(w, r)
    }
}

func main() {
    port := os.Getenv("PORT")
    if port == "" {
        port = "8080"
    }

    publicDir := "./public"

    http.HandleFunc("/api/directories", handleDirectories(publicDir))
    http.Handle("/", spaHandler(publicDir, "index.html"))

    log.Printf("Starting lightweight Go server on http://localhost:%s", port)
    if err := http.ListenAndServe(":"+port, nil); err != nil {
        log.Fatalf("Could not start server: %s\n", err)
    }
}
