package main

import (
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
)

type Todo struct {
	ID    int    `json:"id"`
	Title string `json:"title"`
	Done  bool   `json:"done"`
	Body  string `json:"body"`
}

func main() {
	fmt.Println("Server is running...")
	app := fiber.New()
	todos := []Todo{}

	app.Get("/healthz", func(c *fiber.Ctx) error {
		return c.SendString("APP IS RUNNING")
	})

	app.Post("/api/todo", func(c *fiber.Ctx) error {

		newTodo := &Todo{}

		if err := c.BodyParser(newTodo); err != nil {
			return err
		}

		newTodo.ID = len(todos) + 1;

		todos = append(todos, *newTodo)


		return c.JSON(todos)
	})

	app.Patch("/api/todo/:id/check", func(c *fiber.Ctx) error {

		id, err := c.ParamsInt("id")

		if err != nil {
			return c.Status(401).SendString("Invalid ID")
		}

		for i, t := range todos {
			if t.ID == id {
				todos[i].Done = true
				break
			}
		}

		return c.JSON(todos)
	})

	app.Patch("/api/todo/:id/uncheck", func(c *fiber.Ctx) error {

		id, err := c.ParamsInt("id")

		if err != nil {
			return c.Status(401).SendString("Invalid ID")
		}

		for i, t := range todos {
			if t.ID == id {
				todos[i].Done = false
				break
			}
		}

		return c.JSON(todos)
	})

	app.Get("/api/todos", func(c *fiber.Ctx) error {
		return c.JSON(todos)
	})

	log.Fatal(app.Listen(":4000"))
}
