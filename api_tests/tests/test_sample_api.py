import requests
import pytest

BASE_URL = "https://jsonplaceholder.typicode.com"

def test_get_single_todo_item():
    """
    Tests that we can retrieve a single todo item (ID 1)
    and validates its structure and status code.
    """
    # Arrange: Define the endpoint for a specific resource
    todo_id = 1
    endpoint = f"{BASE_URL}/todos/{todo_id}"

    # Act: Make the GET request
    response = requests.get(endpoint)
    data = response.json()

    # Assert: Validate the response
    assert response.status_code == 200, f"Expected status code 200, but got {response.status_code}"
    assert data['userId'] == 1, "The 'userId' did not match the expected value"
    assert data['id'] == todo_id, "The 'id' did not match the requested todo_id"
    assert "title" in data, "The response JSON is missing the 'title' key"
    assert "completed" in data, "The response JSON is missing the 'completed' key"

def test_get_all_todos():
    """
    Tests that we can retrieve the list of all todos
    and checks if it's a non-empty list.
    """
    # Arrange
    endpoint = f"{BASE_URL}/todos"

    # Act
    response = requests.get(endpoint)
    data = response.json()

    # Assert
    assert response.status_code == 200
    assert isinstance(data, list), "Expected response to be a list"
    assert len(data) > 0, "The list of todos should not be empty"
