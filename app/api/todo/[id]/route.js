// app/api/todo/[id]/route.js
import connectToDatabase from '@/lib/mongodb';
import Todo from '@/models/Todo';
import { NextResponse } from 'next/server';

export async function PUT(req, { params }) {
  await connectToDatabase();
  const { id } = params;

  try {
    const body = await req.json();
    const todo = await Todo.findByIdAndUpdate(id, body, { new: true });
    if (!todo) return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
    return NextResponse.json(todo);
  } catch (error) {
    return NextResponse.json({ error: 'Unable to update todo' }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  await connectToDatabase();
  const { id } = params;

  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
    return NextResponse.json({ message: 'Todo deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Unable to delete todo' }, { status: 400 });
  }
}
