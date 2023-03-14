const getUser = async () => {    
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user: { email: 'test-user@mail.com' }})
    }
    const response = await fetch('http://localhost:3002/db/get-user', options)
    return await response.json()
}

const createUser = async () => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user: { email: 'test-user@mail.com' }, tasks: [] })
    }
    const response = await fetch('http://localhost:3002/db/create-user', options)
    return await response.json()
}

const updateUser = async () => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: { name: 'User', email: 'test-user@mail.com', image: '' },
            tasks: [{ id: 1, text: 'This is a test', completed: false }]
        })
    }
    const response = await fetch('http://localhost:3002/db/update-user', options)
    return await response.json()
}

describe('getUser', () => {
  test('Returns a user', async () => {
    const data = await getUser();
    expect(data.result.user).toHaveProperty('name');
    expect(data.result.user).toHaveProperty('email');
    expect(data.result.user).toHaveProperty('image');
  });
});

describe('createUser', () => {
    test('Returns a confirmation', async () => {
      const data = await createUser();
      expect(data).toHaveProperty('status');
      expect(data.status).toMatch('User created');
    });
});

describe('updateUser', () => {
    test('Returns the updated user', async () => {
        const data = await updateUser();
        expect(data.result.user).toHaveProperty('name');
        expect(data.result.user).toHaveProperty('email');
        expect(data.result.user).toHaveProperty('image');
        expect(data.result.tasks[0].id).toBe(1);
        expect(data.result.tasks[0].text).toMatch('This is a test');
        expect(data.result.tasks[0].completed).toBeFalsy();
    });
});