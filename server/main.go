package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
	"path/filepath"
)

func handleDirectories(publicDir string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
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
	return func(w http.ResponseWriter, r *http.Request) {
		path := filepath.Join(staticPath, r.URL.Path)

		_, err := os.Stat(path)
		if os.IsNotExist(err) {
			http.ServeFile(w, r, filepath.Join(staticPath, indexPath))
			return
		} else if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		http.FileServer(http.Dir(staticPath)).ServeHTTP(w, r)
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
