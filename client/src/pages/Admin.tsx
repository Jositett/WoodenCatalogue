
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { Door } from '@shared/schema';

const Admin = () => {
  const [, setLocation] = useLocation();
  const [doors, setDoors] = useState<Door[]>([]);
  const [newDoor, setNewDoor] = useState<Partial<Door>>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkUser();
    fetchDoors();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      setLocation('/login');
    }
  };

  const fetchDoors = async () => {
    setError(null);
    try {
      const { data, error } = await supabase.from('doors').select('*');
      if (error) {
        setError(error.message);
        console.error('Error fetching doors:', error);
        return;
      }
      setDoors(data);
    } catch (error) {
      setError('An unexpected error occurred while fetching doors.');
      console.error('Error fetching doors:', error);
    }
  };

  const createDoor = async () => {
    setError(null);
    try {
      const { error } = await supabase.from('doors').insert([newDoor]);
      if (error) {
        setError(error.message);
        console.error('Error creating door:', error);
        return;
      }
      fetchDoors();
      setNewDoor({});
    } catch (error) {
      setError('An unexpected error occurred while creating a door.');
      console.error('Error creating door:', error);
    }
  };

  const updateDoor = async (id: number, updates: Partial<Door>) => {
    setError(null);
    try {
      const { error } = await supabase.from('doors').update(updates).eq('id', id);
      if (error) {
        setError(error.message);
        console.error('Error updating door:', error);
        return;
      }
      fetchDoors();
    } catch (error) {
      setError('An unexpected error occurred while updating a door.');
      console.error('Error updating door:', error);
    }
  };

  const deleteDoor = async (id: number) => {
    setError(null);
    try {
      const { error } = await supabase.from('doors').delete().eq('id', id);
      if (error) {
        setError(error.message);
        console.error('Error deleting door:', error);
        return;
      }
      fetchDoors();
    } catch (error) {
      setError('An unexpected error occurred while deleting a door.');
      console.error('Error deleting door:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F3E9] dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <h1 className="font-playfair text-3xl md:text-4xl text-[#7D5A50] dark:text-amber-300 font-bold mb-8">
          Database Management
        </h1>

        <Card className="bg-white dark:bg-gray-800 shadow-md">
          <CardContent className="p-6">
            <Tabs defaultValue="view" className="space-y-6">
              <TabsList className="bg-[#E8E4DA] dark:bg-gray-700">
                <TabsTrigger value="view" className="text-[#5C4033] dark:text-amber-100">View Data</TabsTrigger>
                <TabsTrigger value="create" className="text-[#5C4033] dark:text-amber-100">Create New</TabsTrigger>
              </TabsList>

              <TabsContent value="view">
                <div className="rounded-sm overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-[#E8E4DA] dark:bg-gray-700">
                        <TableHead className="text-[#5C4033] dark:text-amber-200">ID</TableHead>
                        <TableHead className="text-[#5C4033] dark:text-amber-200">Name</TableHead>
                        <TableHead className="text-[#5C4033] dark:text-amber-200">Price</TableHead>
                        <TableHead className="text-[#5C4033] dark:text-amber-200">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {doors.map((door) => (
                        <TableRow key={door.id} className="border-b border-[#E8E4DA] dark:border-gray-700">
                          <TableCell className="text-[#5C4033] dark:text-gray-300">{door.id}</TableCell>
                          <TableCell className="text-[#5C4033] dark:text-gray-300">{door.name}</TableCell>
                          <TableCell className="text-[#5C4033] dark:text-gray-300">${door.price.toLocaleString()}</TableCell>
                          <TableCell>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => deleteDoor(door.id)}
                              className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                {error && <p className="text-red-500 mt-4">{error}</p>}
              </TabsContent>

              <TabsContent value="create">
                <div className="space-y-4 max-w-md">
                  <Input
                    placeholder="Door Name"
                    value={newDoor.name || ''}
                    onChange={(e) => setNewDoor({ ...newDoor, name: e.target.value })}
                    className="border-[#D4B483] dark:border-gray-600 focus-visible:ring-[#7D5A50] dark:focus-visible:ring-amber-500"
                  />
                  <Input
                    type="number"
                    placeholder="Price"
                    value={newDoor.price || ''}
                    onChange={(e) => setNewDoor({ ...newDoor, price: Number(e.target.value) })}
                    className="border-[#D4B483] dark:border-gray-600 focus-visible:ring-[#7D5A50] dark:focus-visible:ring-amber-500"
                  />
                  <Button 
                    onClick={createDoor}
                    className="bg-[#7D5A50] hover:bg-[#5C4033] dark:bg-amber-600 dark:hover:bg-amber-700 text-white w-full"
                  >
                    Create Door
                  </Button>
                </div>
                {error && <p className="text-red-500 mt-4">{error}</p>}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
