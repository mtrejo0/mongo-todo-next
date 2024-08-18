// app/api/todo/route.js

import connectToDatabase from '@/lib/mongodb';
import Todo from '@/models/Todo';
import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';

export async function POST(req) {
  await connectToDatabase();
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const todo = new Todo({
      title: body.title,
      user_id: userId,
    });
    const savedTodo = await todo.save();
    console.log('Saved todo:', savedTodo);
    return NextResponse.json(savedTodo, { status: 201 });
  } catch (error) {
    console.error('Error creating todo:', error);
    return NextResponse.json({ error: 'Unable to create todo', details: error.message }, { status: 400 });
  }
}

export async function GET(req) {
  await connectToDatabase();
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const todos = await Todo.find({ user_id: userId });
    return NextResponse.json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    return NextResponse.json({ error: 'Unable to fetch todos', details: error.message }, { status: 400 });
  }
}
