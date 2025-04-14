
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { Door } from '@shared/schema';

const Admin = () => {
  const [doors, setDoors] = useState<Door[]>([]);
  const [newDoor, setNewDoor] = useState<Partial<Door>>({});
  
  useEffect(() => {
    fetchDoors();
  }, []);

  const fetchDoors = async () => {
    const { data, error } = await supabase.from('doors').select('*');
    if (error) {
      console.error('Error fetching doors:', error);
      return;
    }
    setDoors(data);
  };

  const createDoor = async () => {
    const { error } = await supabase.from('doors').insert([newDoor]);
    if (error) {
      console.error('Error creating door:', error);
      return;
    }
    fetchDoors();
    setNewDoor({});
  };

  const updateDoor = async (id: number, updates: Partial<Door>) => {
    const { error } = await supabase.from('doors').update(updates).eq('id', id);
    if (error) {
      console.error('Error updating door:', error);
      return;
    }
    fetchDoors();
  };

  const deleteDoor = async (id: number) => {
    const { error } = await supabase.from('doors').delete().eq('id', id);
    if (error) {
      console.error('Error deleting door:', error);
      return;
    }
    fetchDoors();
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Database Management</h1>
      
      <Tabs defaultValue="view">
        <TabsList>
          <TabsTrigger value="view">View Data</TabsTrigger>
          <TabsTrigger value="create">Create New</TabsTrigger>
        </TabsList>
        
        <TabsContent value="view">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {doors.map((door) => (
                <TableRow key={door.id}>
                  <TableCell>{door.id}</TableCell>
                  <TableCell>{door.name}</TableCell>
                  <TableCell>${door.price}</TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteDoor(door.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        
        <TabsContent value="create">
          <div className="space-y-4">
            <Input
              placeholder="Door Name"
              value={newDoor.name || ''}
              onChange={(e) => setNewDoor({ ...newDoor, name: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Price"
              value={newDoor.price || ''}
              onChange={(e) => setNewDoor({ ...newDoor, price: Number(e.target.value) })}
            />
            <Button onClick={createDoor}>Create Door</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
