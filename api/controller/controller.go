package controller

import (
	"fmt"
	"net/http"
)

func BBSIndex(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	fmt.Fprint(w, "hello")
}